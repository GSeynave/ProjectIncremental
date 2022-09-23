import { Injectable } from '@angular/core';
import { InventaireRessource } from '../models/inventaire-ressource';
import { Ressource } from '../models/ressource';

@Injectable({
  providedIn: 'root'
})
export class InventaireRessourceService {

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
}
