import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ObjectId } from 'mongodb';
import { catchError, Observable, throwError } from 'rxjs';
import { Monstre } from '../models/monstre';

@Injectable({
  providedIn: 'root',
})
export class MonstreService {
  url: string = 'http://localhost:3000/api/monstres';
  constructor(private http: HttpClient) {}
  getMonstresByZoneId(zoneId: ObjectId): Observable<Monstre[]> {
    return this.http
      .get<Monstre[]>(this.url + `/${zoneId}`)
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
