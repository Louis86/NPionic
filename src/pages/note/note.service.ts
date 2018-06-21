import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders  } from '@angular/common/http';
//import { Headers, RequestOptions } from '@angular/http';
import { of } from 'rxjs/observable/of';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';
import {MessageService} from '../categorie/message.service';
import {Note} from './note';
//import {Categorie} from '../categorie/categorie';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json',
    'Authorization': 'my-auth-token' })
};
@Injectable()
export class NoteService {

  constructor(private http: HttpClient) {
  }

  private _urlNote: string = "http://127.0.0.1:8000/api/liste/note";

  getNote(): Observable<Note[]> {
    return this.http.get<Note[]>(this._urlNote)
      .pipe(catchError(this.handleError('getNote', []))) ;
  }

  private urlSupprimerNote: string = "http://127.0.0.1:8000/api/supprimer/note";


  supprimerNote (not: any | number): Observable<Note> {
    const id = typeof not === 'number' ? not : not.id;
    const url = `${this.urlSupprimerNote}/${id}`;

    console.log(url);
    return this.http.delete<Note>(url,httpOptions);
  }


  private urlAjoutNote: string = "http://127.0.0.1:8000/api/ajout/note";

  ajoutNote(newnote: Note): Observable<Note> {
    let nttt = JSON.stringify(
      {
        "title":newnote.title,
        "content":newnote.content,
        "categorie":newnote.categorie
      }
    )
    console.log(nttt);
    return this.http.post<Note>(this.urlAjoutNote, nttt, httpOptions)
      .pipe(   );
  }

  private _urlModifierNote: string = "http://127.0.0.1:8000/api/edit/note";
  editerNote (mdnote: Note): Observable<Note> {
    let not = JSON.stringify(
      {
        "title":mdnote.title,
        "content":mdnote.content,
        "categorie":mdnote.categorie
      }
    )
    console.log(not);
    return this.http.put(`${this._urlModifierNote}/${mdnote.id}`, not, httpOptions).pipe(
      tap(_ => this.log(`mise à jours de la notee id=${mdnote.id}`)),
      catchError(this.handleError<any>('editCategorie'))
    );
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    console.log(message);
  }
}
