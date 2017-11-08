import {Component, OnInit, ViewChild, Renderer, ElementRef, AfterViewInit, animate, trigger,state,style,transition} from '@angular/core';
import {Http,Response} from '@angular/http';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import { noteService } from './note.service';
import { Router,ActivatedRoute, Params }  from '@angular/router';

@Component({
  selector: 'noteShow',
  templateUrl: '/noteShow.html',
  styleUrls: ['stylesheets/bootstrap.min.css'],
  styles: [
  `
    .info{
      padding:10px;
      background:rgba(255,160,122,0.9);
      font-size:20px;
    }
  `
  ]
})
export class AppShowComponent  implements OnInit {
  note :any = {};
	constructor(private noteService: noteService,private router: Router,private route: ActivatedRoute) {
	}
	ngOnInit(){
    this.route.params.map(p => p['noteId']).subscribe(noteId => {
      this.noteService.getNote(noteId).then(note => {
        this.note=note && note.length>0?note[0]:false;
        if(this.note)
          this.note.content = this.note.content.replace(/\n/g,'<br/>');
      });
    });
	}
}