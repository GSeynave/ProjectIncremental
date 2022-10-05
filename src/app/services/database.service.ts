import { Injectable } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Monstre } from '../models/monstre';
import { Ressource } from '../models/ressource';
import { Statistique } from '../models/statistique';
import { Zone } from '../models/zone';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  constructor() { }

  getStatistiqueById(id: number): Statistique {
    let statistiquePersonnage: Statistique = new Statistique();
    statistiquePersonnage.id = 1;
    statistiquePersonnage.terre = 1;
    statistiquePersonnage.feu = 1;
    statistiquePersonnage.air = 1;
    statistiquePersonnage.eau = 1;
    statistiquePersonnage.resistanceTerre = 2;
    statistiquePersonnage.resistanceFeu = 0;
    statistiquePersonnage.resistanceAir = 0;
    statistiquePersonnage.resistanceEau = 0;

    let statistiqueMonstre1: Statistique = new Statistique();
    statistiqueMonstre1.id = 1;
    statistiqueMonstre1.vie = 12;
    statistiqueMonstre1.terre = 10;
    statistiqueMonstre1.feu = 1;
    statistiqueMonstre1.air = 1;
    statistiqueMonstre1.eau = 1;
    statistiqueMonstre1.resistanceTerre = 25;
    statistiqueMonstre1.resistanceFeu = 0;
    statistiqueMonstre1.resistanceAir = 0;
    statistiqueMonstre1.resistanceEau = 0;

    let statistiqueMonstre2: Statistique = new Statistique();
    statistiqueMonstre2.id = 2;
    statistiqueMonstre2.vie = 12;
    statistiqueMonstre2.terre = 1;
    statistiqueMonstre2.feu = 1;
    statistiqueMonstre2.air = 1;
    statistiqueMonstre2.eau = 10;
    statistiqueMonstre2.resistanceTerre = 0;
    statistiqueMonstre2.resistanceFeu = 0;
    statistiqueMonstre2.resistanceAir = 0;
    statistiqueMonstre2.resistanceEau = 25;

    if (id == 1) {
      return statistiquePersonnage;
    } else if (id == 2) {
      return statistiqueMonstre2;
    } else {
      return statistiqueMonstre1;
    }
  }


  getDrop(monstre: Monstre): Ressource[] {
    const ressources: Ressource[] = [];
    if (monstre.id == 1) {
      let ressource1: Ressource = new Ressource();
      ressource1.id = 1;
      ressource1.idMonstre = 1;
      ressource1.idZone = 1;
      ressource1.nom = "Ongle d\'orc";
      ressource1.tauxDrop = 35;
      let ressource2: Ressource = new Ressource();
      ressource2.id = 1;
      ressource2.idMonstre = 1;
      ressource2.idZone = 1;
      ressource2.nom = "Poils d\'orc";
      ressource2.tauxDrop = 5;

      if (this.isDrop(ressource1.tauxDrop)) {
        ressources.push(ressource1);
      }
      if (this.isDrop(ressource2.tauxDrop)) {
        ressources.push(ressource2);
      }
    } else {
      let ressource1: Ressource = new Ressource();
      ressource1.id = 2;
      ressource1.idMonstre = 2;
      ressource1.idZone = 1;
      ressource1.nom = "Os de squelette";
      ressource1.tauxDrop = 35;
      let ressource2: Ressource = new Ressource();
      ressource2.id = 1;
      ressource2.idMonstre = 1;
      ressource2.idZone = 1;
      ressource2.nom = "Dent de squelette";
      ressource2.tauxDrop = 5;
      if (this.isDrop(ressource1.tauxDrop)) {
        ressources.push(ressource1);
      }
      if (this.isDrop(ressource2.tauxDrop)) {
        ressources.push(ressource2);
      }

    }
    return ressources;
  }

  isDrop(tauxDrop: number): boolean {
    if ((Math.floor(Math.random() * 100) + 1) <= tauxDrop) {
      return true;
    }
    return false;
  }

  getMonstreFromZone(zone: Zone): Monstre[] {
    let monstres: Monstre[] = [];
    let monstre1: Monstre = new Monstre();
    monstre1.id = 1;
    monstre1.nom = "Orc";
    monstre1.idStatistique = 2;
    monstre1.idZone = 1;
    let monstre2: Monstre = new Monstre();
    monstre2.id = 2;
    monstre2.nom = "Squelette";
    monstre2.idStatistique = 3;
    monstre2.idZone = 1;
    let monstre3: Monstre = new Monstre();
    monstre2.id = 3;
    monstre2.nom = "Phenix";
    monstre2.idStatistique = 3;
    monstre2.idZone = 1;

    monstres.push(monstre1);
    monstres.push(monstre2);
    monstres.push(monstre3);

    return monstres;
  }
}
