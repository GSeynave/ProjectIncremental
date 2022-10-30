import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { Zone } from '../models/zone';

@Injectable({
  providedIn: 'root',
})
export class ZoneService {
  url: string = 'http://localhost:3000/api/zones';
  constructor(private http: HttpClient) {}

  getZones(): Observable<Zone[]> {
    return this.http.get<Zone[]>(this.url).pipe(catchError(this.handleError));
  }

  getZoneById(zoneId: number): Observable<Zone> {
    return this.http
      .get<Zone>(this.url + `/${zoneId}`)
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
