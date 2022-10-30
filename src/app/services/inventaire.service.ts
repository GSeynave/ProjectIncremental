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

  addRessource(ressource: Ressource, id: number) {
    console.log('api call: ' + this.url + '/ressources');
    const body = { id: id, ressource: ressource };
    return this.http
      .post<any>(this.url + '/ressources', body)
      .pipe(catchError(this.handleError));
  }

  removeRessource(ressource: Ressource): Observable<boolean> {
    const index = this.inventaireRessources.findIndex(
      (ressourceInventaire) => ressourceInventaire.nom === ressource.nom
    );
    if (index > -1) {
      this.inventaireRessources[index].quantite -= ressource.quantite;
      if (this.inventaireRessources[index].quantite <= 0) {
        this.inventaireRessources.splice(index);
      }
    }
    return of(true);
  }

  getInventaireRessource(): Observable<Ressource[]> {
    return of(this.inventaireRessources);
  }

  getQuantite(ressource: Ressource): Observable<number> {
    const index = this.inventaireRessources.findIndex(
      (ressourceInventaire) => ressourceInventaire.nom === ressource.nom
    );
    if (index > -1) {
      return of(this.inventaireRessources[index].quantite);
    }
    return of(0);
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
