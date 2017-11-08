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
  selector: 'noteList',
  /*animations: [
  	trigger(
      'openClosePanel',
      [
        state('close, void', style({opacity:'0.2',top:'90%'})),
        state('open', style({opacity:'1',top:'40%'})),
        transition(
            'close <=> open', [animate(500)])
      ]),
  	trigger(
      'openCloseHero',
      [
        state('close, void', style({opacity:'0',top:'-100%'})),
        state('open', style({opacity:'1',top:'10%'})),
        transition(
            'close <=> open', [animate(500)]),
        transition(
            'void => open', [animate(500)])
      ])
    ],*/

  templateUrl: '/noteList.html',
  styleUrls: ['stylesheets/noteList.css']
})
export class AppListComponent  implements OnInit {
	notes:any[] = [];
	constructor(private noteService: noteService,private router: Router,private route: ActivatedRoute) {
	}
	ngOnInit(){
		this.noteService.getAllNote().then(notes => this.notes=notes);
	}
  doEdit(editNote:any){
    this.router.navigate(['/noteEdit', JSON.stringify(editNote)]);
  }
  doDel(delNote:any){
    this.noteService.delNote(delNote).then(result => {
      this.noteService.getAllNote().then(notes => this.notes=notes);
    });
  }
  doShow(noteId:string){
    this.router.navigate(['/noteShow', noteId]);
  }
}