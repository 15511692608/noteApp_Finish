import { Injectable } from '@angular/core';
import {Http,Response} from '@angular/http';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';

@Injectable()
export class noteService {
  constructor(private http: Http) {
  }
  getAllNote():Promise<any[]> {
    return this.http.get('/mongodb/getAllNote').toPromise().then(res=>
      JSON.parse(res.text()) as any[]
    ).catch(this.handleError);
  }
  getNote(noteId:string):Promise<any[]> {
    return this.http.post('/mongodb/getNote',{_id:noteId}).toPromise().then(res=>
      JSON.parse(res.text()) as any[]
    ).catch(this.handleError);
  }
  addNote(note:any):Promise<any[]> {
    return this.http.post('/mongodb/addNote',note).toPromise().then(res=>
      JSON.parse(res.text()) as any
    ).catch(this.handleError);
  }
  delNote(note:any):Promise<any[]> {
    return this.http.post('/mongodb/delNote',note).toPromise().then(res=>
      JSON.parse(res.text()) as any
    ).catch(this.handleError);
  }
  editNote(note:any):Promise<any[]> {
    return this.http.post('/mongodb/editNote',note).toPromise().then(res=>
      JSON.parse(res.text()) as any
    ).catch(this.handleError);
  }

  private handleError (error: Response | any) {
    console.error(error);
    return { };
  }
}