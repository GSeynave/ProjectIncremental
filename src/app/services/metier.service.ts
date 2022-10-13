import { Injectable } from '@angular/core';
import { Equipement } from '../models/equipement';
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
    let ressource1: Ressource = new Ressource();
    ressource1.quantite = 1;
    ressource1.id = 1;
    ressource1.idMonstre = 1;
    ressource1.idZone = 1;
    ressource1.nom = 'Cendre de phenix';
    recette1.ressources.push(ressource1);
    let recette2: Recette = new Recette();
    recette2.id = 1;
    recette2.niveau = 1;
    let ressource2: Ressource = new Ressource();
    ressource2 = new Ressource();
    ressource2.quantite = 2;
    ressource2.id = 1;
    ressource2.idMonstre = 1;
    ressource2.idZone = 1;
    ressource2.nom = 'Ongle d\'orc';
    recette2.ressources.push(ressource2);
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
