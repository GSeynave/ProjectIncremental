import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { Ressource } from '../models/ressource';

@Injectable({
  providedIn: 'root',
})
export class RessourceService {
  url: string = 'http://localhost:3000/api/ressources';
  constructor(private http: HttpClient) {}

  getRessourcesByMonstreId(monstreId: number): Observable<Ressource[]> {
    return this.http
      .get<Ressource[]>(this.url + `/monstre/${monstreId}`)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      console.log('An error occured:', error.error);
    } else {
      console.error(
        `Backend returned code ${error.status}, body was: `,
        error.error
      );
    }

    return throwError(
      () => new Error('Something bad happened; please try again later.')
    );
  }
}
