import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Equipement } from '../models/equipement';
import { Ressource } from '../models/ressource';

@Injectable({
  providedIn: 'root',
})
export class InventaireService {
  inventaireRessources: Ressource[] = [];
  inventaireEquipements: Equipement[] = [];
  constructor() {}

  addRessource(ressource: Ressource): Observable<boolean> {
    console.log('drop :', ressource);
    const index = this.inventaireRessources.findIndex(
      (ressourceInventaire) => ressourceInventaire.nom === ressource.nom
    );
    if (index > -1) {
      this.inventaireRessources[index].quantite += ressource.quantite;
    } else {
      this.inventaireRessources.push(ressource);
    }
    return of(true);
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
}
