import {Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
//import { Headers, RequestOptions } from '@angular/http';
import {Categorie} from './categorie';
import {MessageService} from './message.service';
import { of } from 'rxjs/observable/of';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';
//import {Note} from "../note/note";

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json',
    'Authorization': 'my-auth-token' })
};

@Injectable()
export class CategorieService {

  private _url: string = "http://127.0.0.1:8000/api/liste/categorie";

  constructor(private http: HttpClient, private messageService: MessageService) {
  }

  getCategorie(): Observable<Categorie[]> {
    return this.http.get<Categorie[]>(this._url)
      .pipe(catchError(this.handleError('getCategorie', []))) ;
  }


  private _urlIdCategorie: string = "http://127.0.0.1:8000/api/edit/categorie";

  getIdCategories(id: number): Observable<Categorie> {
    const url = `${this._urlIdCategorie}/${id}`;
    return this.http.get<Categorie>(url).pipe(
      tap(_ => this.log(`fetched categorie id=${id}`)),
      catchError(this.handleError<Categorie>(`getCategorie id=${id}`))
    );
  }





  private urlAjoutCategorie: string = "http://127.0.0.1:8000/api/ajout/categorie";

  ajoutCategorie  (cat: Categorie): Observable<Categorie> {
    let catt = JSON.stringify(
      {
        "libelle":cat.libelle
      }
    )
    return this.http.post<Categorie>(this.urlAjoutCategorie, catt, httpOptions)
      .pipe(
        catchError(this.handleError('ajouterCategorie', cat))
      );
  }



  private _urlSupprimerCategorie: string = "http://127.0.0.1:8000/api/supprimer/categorie";
  supprimerCategorie (cat: Categorie | number): Observable<Categorie> {
    const id = typeof cat === 'number' ? cat : cat.id;
    const url = `${this._urlSupprimerCategorie}/${id}`;

    return this.http.delete<Categorie>(url, httpOptions).pipe(
      tap(_ => this.log(`supprimer categorie id=${id}`)),
      catchError(this.handleError<Categorie>('supprimerCategorie'))
    );
  }



  private _urlModifierCategorie: string = "http://127.0.0.1:8000/api/edit/categorie";
  editerCategorie (id: number, libel: string): Observable<Categorie> {
    let catt = JSON.stringify(
      {
        "libelle":libel
      }
    )
    return this.http.put(`${this._urlModifierCategorie}/${id}`, catt, httpOptions).pipe(
      tap(_ => this.log(`mise à jours de la categorie id=${id}`)),
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
    this.messageService.add('CategorieService: ' + message);
  }

}
