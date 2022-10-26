import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Ressource } from '../models/ressource';

@Injectable({
  providedIn: 'root',
})
export class RessourceService {
  constructor() {}

  getRessourcesByMonstreId(monstreId: number): Observable<Ressource[]> {
    let ressources: Ressource[] = [];
    let ressource1: Ressource = new Ressource();
    let ressource2: Ressource = new Ressource();

    if (monstreId == 1) {
      ressource1.id = 1;
      ressource1.idMonstre = 1;
      ressource1.idZone = 1;
      ressource1.nom = "Ongle d'orc";
      ressource1.tauxDrop = 35;
      ressource2.id = 2;
      ressource2.idMonstre = 1;
      ressource2.idZone = 1;
      ressource2.nom = "Poils d'orc";
      ressource2.tauxDrop = 5;
    } else if (monstreId == 2) {
      ressource1.id = 1;
      ressource1.idMonstre = 1;
      ressource1.idZone = 1;
      ressource1.nom = 'Os de squelette';
      ressource1.tauxDrop = 35;
      ressource2.id = 2;
      ressource2.idMonstre = 1;
      ressource2.idZone = 1;
      ressource2.nom = 'Dent de squelette';
      ressource2.tauxDrop = 5;
    } else if (monstreId == 3) {
      ressource1.id = 1;
      ressource1.idMonstre = 1;
      ressource1.idZone = 1;
      ressource1.nom = 'Cendre de phenix';
      ressource1.tauxDrop = 35;
      ressource2.id = 2;
      ressource2.idMonstre = 1;
      ressource2.idZone = 1;
      ressource2.nom = 'Plume de phenix';
      ressource2.tauxDrop = 5;
    } else if (monstreId == 4) {
      ressource1.id = 1;
      ressource1.idMonstre = 1;
      ressource1.idZone = 1;
      ressource1.nom = 'Sang de vampire';
      ressource1.tauxDrop = 35;
      ressource2.id = 2;
      ressource2.idMonstre = 1;
      ressource2.idZone = 1;
      ressource2.nom = 'Dent de vampire';
      ressource2.tauxDrop = 5;
    } else if (monstreId == 5) {
      ressource1.id = 1;
      ressource1.idMonstre = 1;
      ressource1.idZone = 1;
      ressource1.nom = 'Poils de loup garou';
      ressource1.tauxDrop = 35;
      ressource2.id = 2;
      ressource2.idMonstre = 1;
      ressource2.idZone = 1;
      ressource2.nom = 'Griffe de loup garou';
      ressource2.tauxDrop = 5;
    } else if (monstreId == 6) {
      ressource1.id = 1;
      ressource1.idMonstre = 1;
      ressource1.idZone = 1;
      ressource1.nom = 'Peau de fantôme';
      ressource1.tauxDrop = 35;
      ressource2.id = 2;
      ressource2.idMonstre = 1;
      ressource2.idZone = 1;
      ressource2.nom = 'Oeil de fatôme';
      ressource2.tauxDrop = 5;
    } else if (monstreId == 7) {
      ressource1.id = 1;
      ressource1.idMonstre = 1;
      ressource1.idZone = 1;
      ressource1.nom = "Patte d'araignée";
      ressource1.tauxDrop = 35;
      ressource2.id = 2;
      ressource2.idMonstre = 1;
      ressource2.idZone = 1;
      ressource2.nom = "Toile d'araignée";
      ressource2.tauxDrop = 5;
    } else if (monstreId == 8) {
      ressource1.id = 1;
      ressource1.idMonstre = 1;
      ressource1.idZone = 1;
      ressource1.nom = 'Bave de chien errant';
      ressource1.tauxDrop = 35;
      ressource2.id = 2;
      ressource2.idMonstre = 1;
      ressource2.idZone = 1;
      ressource2.nom = 'Griffe de chien errant';
      ressource2.tauxDrop = 5;
    } else if (monstreId == 9) {
      ressource1.id = 1;
      ressource1.idMonstre = 1;
      ressource1.idZone = 1;
      ressource1.nom = 'Dent de mort vivant';
      ressource1.tauxDrop = 35;
      ressource2.id = 2;
      ressource2.idMonstre = 1;
      ressource2.idZone = 1;
      ressource2.nom = 'Cerveau de mort vivant';
      ressource2.tauxDrop = 5;
    }
    ressources.push(ressource1);
    ressources.push(ressource2);
    return of(ressources);
  }
}
