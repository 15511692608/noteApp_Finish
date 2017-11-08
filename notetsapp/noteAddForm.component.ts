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
  selector: 'noteAdd',
  templateUrl: '/noteDetail.html',
  styleUrls: ['stylesheets/bootstrap.min.css'],
  styles: [
  `
    textarea{min-height:200px}
    .ng-valid[required], .ng-valid.required  {
      border-left: 5px solid #42A948; /* green */
    }
    .ng-invalid:not(form)  {
      border-left: 5px solid #a94442; /* red */
    }
    .info{
      padding:10px;
      background:rgba(255,160,122,0.7);
    }
  `
  ]
})
export class AppAddFormComponent  implements OnInit {
  stsLst = ['任务','笔记','任务等待','任务进行','任务完成','其他'];
  submitted = false;
  note :any = {};
  addResult:string = '';
  addedNote:any = {};
  editNote :any = {};
	constructor(private noteService: noteService,private router: Router,private route: ActivatedRoute) {
	}
	ngOnInit(){
    this.route.params.map(p => p['note']).subscribe(note => {
      this.editNote = note?JSON.parse(note):false;
      if(this.editNote){
        // edit
        this.note.content = this.editNote.content;
        this.note.name = this.editNote.name;
        this.note.sts = this.editNote.sts;
        this.note._id = this.editNote._id
        this.note.time = this.editNote.time;
      }else{
        // add
        this.note.time = this.Format(new Date,"yyyy-MM-dd");
        this.note.content = '便利贴内容';
        this.note.name = '便利贴标题';
        this.note.sts = this.stsLst[0];
      }
    });
		//this.noteService.getAllNote().then(notes => this.notes=notes);
	}
  onSubmit(){
    if(!this.editNote){
      // add
      this.noteService.addNote(this.note).then((result:any) => {
        this.addResult = JSON.stringify(result);
        this.addedNote = result.ops?result.ops[0]:{};
        this.submitted = true;
      });
    }else{
      // edit
      this.noteService.editNote(this.note).then((result:any) => {
        this.addResult = JSON.stringify(result);
        this.addedNote = result.ops?result.ops[0]:{};
        this.addedNote = this.note;
        this.submitted = true;
      });
    }
  }
  noteFormInit(){
    this.note.time = this.Format(new Date,"yyyy-MM-dd");
    this.note.content = '便利贴内容';
    this.note.name = '便利贴标题';
    this.note.sts = this.stsLst[0];
  }
  doReadd(){
    this.note.time = this.Format(new Date,"yyyy-MM-dd");
    this.note.content = '便利贴内容';
    this.note.name = '便利贴标题';
    this.note.sts = this.stsLst[0];
    this.submitted=!this.submitted;
  }
  doReedit(){
    this.editNote.content = this.addedNote.content;
    this.editNote.name = this.addedNote.name;
    this.editNote.sts = this.addedNote.sts;
    this.editNote._id = this.addedNote._id
    this.editNote.time = this.addedNote.time;

    this.note.content = this.editNote.content;
    this.note.name = this.editNote.name;
    this.note.sts = this.editNote.sts;
    this.note._id = this.editNote._id
    this.note.time = this.editNote.time;
    this.submitted=!this.submitted;
  }
  doEditReset(){
    this.note.content = this.editNote.content;
    this.note.name = this.editNote.name;
    this.note.sts = this.editNote.sts;
    this.note._id = this.editNote._id
    this.note.time = this.editNote.time;
  }

  Format(date:Date ,fmt:string){
    var o = {
        "M+": date.getMonth() + 1, //月份 
        "d+": date.getDate(), //日 
        "h+": date.getHours(), //小时 
        "m+": date.getMinutes(), //分 
        "s+": date.getSeconds(), //秒 
        "q+": Math.floor((date.getMonth() + 3) / 3), //季度 
        "S": date.getMilliseconds() //毫秒 
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
  }
}