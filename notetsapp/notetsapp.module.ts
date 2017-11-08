import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule }    from '@angular/http';
import { RouterModule,ActivatedRoute, Params }  from '@angular/router';
import { FormsModule }   from '@angular/forms';
import { Location }      from '@angular/common';

import { AppComponent }  from './notetsapp.component';
import { AppListComponent }  from './noteList.component';
import { AppAddFormComponent }  from './noteAddForm.component';
import { AppShowComponent }  from './noteShow.component';
import { noteService } from './note.service';

@NgModule({
  imports:
  [
  	BrowserModule,
  	HttpModule,
    RouterModule.forRoot([
      {
        path: 'noteList',
        component: AppListComponent
      },
      {
        path: 'noteAdd',
        component: AppAddFormComponent
      },
      {
        path: 'noteEdit/:note',
        component: AppAddFormComponent
      },
      {
        path: 'noteShow/:noteId',
        component: AppShowComponent
      }
    ]),
    FormsModule
  ],
  providers: [noteService],
  declarations: [ 
  	AppComponent,
  	AppListComponent,
    AppAddFormComponent,
    AppShowComponent
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
