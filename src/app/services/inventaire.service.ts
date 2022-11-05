import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of, throwError } from 'rxjs';
import { Equipement } from '../models/equipement';
import { Ressource } from '../models/ressource';

@Injectable({
  providedIn: 'root',
})
export class InventaireService {
  url: string = 'http://localhost:3000/api/inventaires';
  inventaireRessources: Ressource[] = [];
  inventaireEquipements: Equipement[] = [];
  constructor(private http: HttpClient) {}

  updateRessource(ressource: Ressource, id: number) {
    const body = { id: id, ressource: ressource };
    return this.http
      .post<any>(this.url + '/ressources', body)
      .pipe(catchError(this.handleError));
  }

  getInventaireRessource(
    idPersonnage: number
  ): Observable<[{ nom: string; quantite: number }]> {
    return this.http
      .get<[{ nom: string; quantite: number }]>(
        this.url + `/ressources/personnage/${idPersonnage}`
      )
      .pipe(catchError(this.handleError));
  }

  getQuantite(ressource: Ressource, id: number): Observable<number> {
    return this.http
      .get<number>(this.url + `/ressources/${ressource.id}/personnage/${id}`)
      .pipe(catchError(this.handleError));
  }

  getEquipementsByPersonnageId(personnageId: number): Observable<Equipement[]> {
    return of(this.inventaireEquipements);
  }

  getInventaireEquipement(): Observable<Equipement[]> {
    return of(this.inventaireEquipements);
  }

  updateInventaireEquipement(equipement: Equipement): Observable<boolean> {
    this.inventaireEquipements.push(equipement);
    return of(true);
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
