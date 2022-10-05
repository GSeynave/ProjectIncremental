import { Injectable } from '@angular/core';
import { Equipement } from '../models/equipement';
import { InventaireRessource } from '../models/inventaire-ressource';
import { Metier } from '../models/metier';
import { Recette } from '../models/recette';
import { Ressource } from '../models/ressource';

@Injectable({
  providedIn: 'root'
})
export class MetierService {

  constructor() { }

  getMetiers() : Metier[] {
    let metiers: Metier[] = [];
    let tailleur: Metier = new Metier();
    tailleur.id = 1;
    tailleur.niveau = 1;
    tailleur.nom = 'Tailleur';

    let bijoutier: Metier = new Metier();
    bijoutier.id = 2;
    bijoutier.niveau = 1;
    bijoutier.nom = 'Bijoutier';

    metiers.push(tailleur);
    metiers.push(bijoutier);
    return metiers;
  }

  getRecetteByMetierId(metierId: number): Recette[] {
    let recettes: Recette[] = [];
    let recette1: Recette = new Recette();
    recette1.id = 1;
    recette1.niveau = 1;
    let inventaireRessource1: InventaireRessource = new InventaireRessource();
    inventaireRessource1.quantite = 15;
    inventaireRessource1.ressource = new Ressource();
    inventaireRessource1.ressource.id = 1;
    inventaireRessource1.ressource.idMonstre = 1;
    inventaireRessource1.ressource.idZone = 1;
    inventaireRessource1.ressource.nom = 'Poils d\'Orc';
    recette1.inventaireRessource.push(inventaireRessource1);
    recette1.inventaireRessource.push(inventaireRessource1);
    let recette2: Recette = new Recette();
    recette2.id = 1;
    recette2.niveau = 1;
    let inventaireRessource2: InventaireRessource = new InventaireRessource();
    inventaireRessource2.quantite = 15;
    inventaireRessource2.ressource = new Ressource();
    inventaireRessource2.ressource.id = 1;
    inventaireRessource2.ressource.idMonstre = 1;
    inventaireRessource2.ressource.idZone = 1;
    inventaireRessource2.ressource.nom = 'Poils d\'Orc';
    recette2.inventaireRessource.push(inventaireRessource2);
    recette2.inventaireRessource.push(inventaireRessource2);
    recette2.inventaireRessource.push(inventaireRessource2);
    recettes.push(recette1);
    recettes.push(recette2);
    return recettes;
  }

  getEquipementByRecetteId(recetteId: number): Equipement {
    let equipement: Equipement = new Equipement();
    equipement.id = 22;
    equipement.level = 1;
    equipement.nom = 'Chapeau de chasseur';
    equipement.recipeId = recetteId;
    equipement.statistiqueId = 22;
    return equipement;
  }
}
