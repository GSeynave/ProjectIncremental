import { Injectable } from '@angular/core';
import { Equipement } from '../models/equipement';
import { Ressource } from '../models/ressource';

@Injectable({
  providedIn: 'root'
})
export class InventaireService {

  inventaireRessources: Ressource[] = [];
  inventaireEquipements: Equipement[] = [];
  constructor() { }

  addRessource(ressource: Ressource) {
    console.log('drop :', ressource);
    const index = this.inventaireRessources.findIndex(ressourceInventaire => ressourceInventaire.nom === ressource.nom);
    if (index > -1) {
      this.inventaireRessources[index].quantite += ressource.quantite;
    } else {
      this.inventaireRessources.push(ressource);
    }
  }

  removeRessource(ressource: Ressource) {
    const index = this.inventaireRessources.findIndex(ressourceInventaire => ressourceInventaire.nom === ressource.nom);
    if (index > -1) {
      this.inventaireRessources[index].quantite -= ressource.quantite;
    }
  }

  getInventaireRessource() {
    return this.inventaireRessources;
  }

  getQuantite(ressource: Ressource): number {
    const index = this.inventaireRessources.findIndex(ressourceInventaire => ressourceInventaire.nom === ressource.nom);
    if (index > -1) {
      return this.inventaireRessources[index].quantite;
    }
    return 0;
  }

  getEquipementsByPersonnageId(personnageId: number): Equipement[] {
    return this.inventaireEquipements;
  }

  getInventaireEquipement(): Equipement[] {
    return this.inventaireEquipements;
  }

  updateInventaireEquipement(equipement: Equipement) {
    this.inventaireEquipements.push(equipement);
  }

}
