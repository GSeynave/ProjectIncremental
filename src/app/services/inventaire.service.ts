import { Injectable } from '@angular/core';
import { Equipement } from '../models/equipement';
import { InventaireRessource } from '../models/inventaire-ressource';
import { Ressource } from '../models/ressource';

@Injectable({
  providedIn: 'root'
})
export class InventaireService {

  inventaireRessources: InventaireRessource []=  [];
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
    let equipements: Equipement[] = [];
    let equipement1: Equipement = new Equipement();
    equipement1.id = 22;
    equipement1.statistiqueId = 22;
    equipement1.level = 1;
    equipement1.recipeId = 22;
    equipement1.quantite = 3;

    equipements.push(equipement1);
    return equipements;
  }

  getInventaireEquipement() : Equipement[] {
    let equipements: Equipement[] = [];
    let equipement1: Equipement = new Equipement();
    equipement1.id = 22;
    equipement1.level = 0;
    equipement1.nom = "Chapeau de chasseur";
    equipement1.quantite = 3;
    equipement1.recipeId = 1;
    equipement1.statistiqueId = 22;
    equipements.push(equipement1);
    return equipements;
  }
}
