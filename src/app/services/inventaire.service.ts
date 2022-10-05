import { Injectable } from '@angular/core';
import { Equipement } from '../models/equipement';
import { InventaireRessource } from '../models/inventaire-ressource';
import { Ressource } from '../models/ressource';

@Injectable({
  providedIn: 'root'
})
export class InventaireService {

  inventaireRessources: InventaireRessource []=  [];
  equipements: Equipement[] = [];
  constructor() { }

  updateInventaireRessource(ressource: Ressource, quantite: number) {
    let inventaireRessource: InventaireRessource = new InventaireRessource();
    inventaireRessource.quantite = quantite;
    inventaireRessource.ressource = ressource;
    this.inventaireRessources.push(inventaireRessource);
  }

  getInventaireRessource(){
    return this.inventaireRessources;
  }

  getEquipementsByPersonnageId(personnageId: number) : Equipement[] {
    return this.equipements;
  }

  getInventaireEquipement() : Equipement[] {
    return this.equipements;
  }

  updateInventaireEquipement(equipement: Equipement) {
    this.equipements.push(equipement);
  }

}
