import { Injectable } from '@angular/core';
import { Ressource } from '../models/ressource';

@Injectable({
  providedIn: 'root'
})
export class RessourceService {

  constructor() { }

  getRessourcesByMonstreId(monstreId: number): Ressource[] {

    let ressources: Ressource[] = [];
    let ressource1: Ressource = new Ressource();
    let ressource2: Ressource = new Ressource();

    if (monstreId == 1) {
      ressource1.id = 1;
      ressource1.idMonstre = 1;
      ressource1.idZone = 1;
      ressource1.nom = 'Patte d\'Arakne';
      ressource1.tauxDrop = 35;
      ressource2.id = 2;
      ressource2.idMonstre = 1;
      ressource2.idZone = 1;
      ressource2.nom = 'Patte d\'Arakne Magique';
      ressource2.tauxDrop = 5;
    } else if (monstreId == 2) {
      ressource1.id = 1;
      ressource1.idMonstre = 1;
      ressource1.idZone = 1;
      ressource1.nom = 'Epine de Champ Champ';
      ressource1.tauxDrop = 35;
      ressource2.id = 2;
      ressource2.idMonstre = 1;
      ressource2.idZone = 1;
      ressource2.nom = 'Sporme de Champ Champ';
      ressource2.tauxDrop = 5;
    } else if (monstreId == 3) {
      ressource1.id = 1;
      ressource1.idMonstre = 1;
      ressource1.idZone = 1;
      ressource1.nom = 'Sourcil de Moskito';
      ressource1.tauxDrop = 35;
      ressource2.id = 2;
      ressource2.idMonstre = 1;
      ressource2.idZone = 1;
      ressource2.nom = 'Ailes de Moskito';
      ressource2.tauxDrop = 5;
    }

    ressources.push(ressource1);
    ressources.push(ressource2);
    return ressources;
  }
}
