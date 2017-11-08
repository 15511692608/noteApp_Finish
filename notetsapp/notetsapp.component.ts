import {Component, OnInit, ViewChild, Renderer, ElementRef, AfterViewInit, animate, trigger,state,style,transition} from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Params }  from '@angular/router';

@Component({
  selector: '.noteMain',
  template: 
  `
	<h1>{{title}}</h1>
	<nav>
		<a routerLink="/noteList" routerLinkActive="active">列表</a>
		<a routerLink="/noteAdd" routerLinkActive="active">添加</a>
		<a href="javascript:void(0)"(click)="goBack()" *ngIf="!this.location.isCurrentPathEqualTo('/')">返回</a>
	</nav>
	<br />
	<router-outlet></router-outlet>
	<div [hidden]="!location.isCurrentPathEqualTo('/')" style='text-align:center;position:absolute;top:10%;z-index:-1;width:90%;'><img src='images/pic.jpg' /></div>
  `,
  styles: [
  `
	nav a {
	  padding: 5px 10px;
	  text-decoration: none;
	  margin-top: 10px;
	  display: inline-block;
	  background-color: #eee;
	  border-radius: 4px;
	}
	nav a:visited, a:link {
	  color: #607D8B;
	}
	nav a:hover {
	  color: #039be5;
	  background-color: #CFD8DC;
	}
	nav a.active {
	  background-color: #039be5;
	  color: #eee;
	}
  `
  ]
})
export class AppComponent  implements OnInit {
	notes:any[] = [];
	title:string = '我的便利贴';
	constructor(private location: Location,private route: ActivatedRoute) {
	}
	ngOnInit(){
		//to do
	}
	goBack(): void {
		if(!this.location.isCurrentPathEqualTo('/'))
			this.location.back();
	}
}