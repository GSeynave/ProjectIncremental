import { Injectable } from '@angular/core';
import { Equipement } from '../models/equipement';
import { Statistique } from '../models/statistique';
import { InventaireService } from './inventaire.service';

@Injectable({
  providedIn: 'root'
})
export class StatistiqueService {

  constructor(private inventaireService: InventaireService) { }

  getStatistiqueById(id: number): Statistique {
    let statistique: Statistique = new Statistique();
    if (id === 22) {
    statistique.id = 22;
    statistique.vie = 500;
    statistique.terre = 200;
    statistique.feu = 200;
    statistique.air = 200;
    statistique.eau = 200;
    statistique.sagesse = 200;
    statistique.hate = 200;
    statistique.puissance = 200;
    statistique.dexterite = 200;
    statistique.precision = 200;
    statistique.energie = 200;
    statistique.critiqueChance = 200;
    statistique.critiqueDommage = 200;
    statistique.resistanceTerre = 200;
    statistique.resistanceFeu = 200;
    statistique.resistanceAir = 200;
    statistique.resistanceEau = 200;

    return statistique;
    }
    statistique.id = this.getRandomStatistique(10);
    statistique.vie = this.getRandomStatistique(20);
    statistique.terre = this.getRandomStatistique(5);
    statistique.feu = this.getRandomStatistique(5);
    statistique.air = this.getRandomStatistique(5);
    statistique.eau = this.getRandomStatistique(5);
    statistique.sagesse = this.getRandomStatistique(5);
    statistique.hate = this.getRandomStatistique(10);
    statistique.puissance = this.getRandomStatistique(12);
    statistique.dexterite = this.getRandomStatistique(6);
    statistique.precision = this.getRandomStatistique(6);
    statistique.energie = this.getRandomStatistique(2000);
    statistique.critiqueChance = this.getRandomStatistique(100);
    statistique.critiqueDommage = this.getRandomStatistique(5);
    statistique.resistanceTerre = this.getRandomStatistique(50);
    statistique.resistanceFeu = this.getRandomStatistique(50);
    statistique.resistanceAir = this.getRandomStatistique(50);
    statistique.resistanceEau = this.getRandomStatistique(50);
    return statistique;
  }

  getEquipementStatistiqueByPersonnage(personnageId: number) : Statistique {
    let equipements: Equipement[] = []
    equipements = this.inventaireService.getEquipementsByPersonnageId(personnageId);
    let statistiqueEquipement: Statistique = this.getStatiqueByEquipement(equipements);
    return statistiqueEquipement;
  }

  private getStatiqueByEquipement(equipements: Equipement[]): Statistique {
    let statTotal: Statistique = new Statistique();
    equipements.forEach( equipement => {
      let statTemp: Statistique = this.getStatistiqueById(equipement.id);
      let statistiqueMultiple = this.getmultipleStatistiqueByEquipementQuantite(statTemp, equipement.quantite);
      statTotal = this.addStatistiques(statTotal, statistiqueMultiple);
    });

    return statTotal;
  }

  getmultipleStatistiqueByEquipementQuantite(stat:Statistique, quantite: number): Statistique {
    let statTotal: Statistique = new Statistique();
    statTotal.vie = stat.vie *quantite;
    statTotal.energie = stat.energie * quantite;
    statTotal.feu = stat.feu * quantite;
    statTotal.air = stat.air * quantite;
    statTotal.eau = stat.eau * quantite;
    statTotal.terre = stat.terre * quantite;
    statTotal.sagesse = stat.sagesse * quantite;
    statTotal.puissance = stat.puissance * quantite;
    statTotal.hate = stat.hate * quantite;
    statTotal.dexterite = stat.dexterite * quantite;
    statTotal.precision = stat.precision * quantite
    statTotal.critiqueChance = stat.critiqueChance * quantite;
    statTotal.critiqueDommage = stat.critiqueDommage * quantite;
    statTotal.resistanceAir = stat.resistanceAir * quantite;
    statTotal.resistanceEau = stat.resistanceEau * quantite;
    statTotal.resistanceFeu = stat.resistanceFeu * quantite;
    statTotal.resistanceTerre = stat.terre * quantite;

    return statTotal;
  }

  addStatistiques(stat1: Statistique, stat2: Statistique): Statistique {
    let statTotal : Statistique = new Statistique();
    statTotal.vie = stat1.vie + stat2.vie;
    statTotal.energie = stat1.energie + stat2.energie;
    statTotal.feu = stat1.feu + stat2.feu;
    statTotal.air = stat1.air + stat2.air;
    statTotal.eau = stat1.eau + stat2.eau;
    statTotal.terre = stat1.terre + stat2.terre;
    statTotal.sagesse = stat1.sagesse + stat2.sagesse;
    statTotal.puissance = stat1.puissance + stat2.puissance;
    statTotal.hate = stat1.hate + stat2.hate;
    statTotal.dexterite = stat1.dexterite + stat2.dexterite;
    statTotal.precision = stat1.precision + stat2.precision;
    statTotal.critiqueChance = stat1.critiqueChance + stat2.critiqueChance;
    statTotal.critiqueDommage = stat1.critiqueDommage + stat2.critiqueDommage;
    statTotal.resistanceAir = stat1.resistanceAir + stat2.resistanceAir;
    statTotal.resistanceEau = stat1.resistanceEau + stat2.resistanceEau;
    statTotal.resistanceFeu = stat1.resistanceFeu + stat2.resistanceFeu;
    statTotal.resistanceTerre = stat1.resistanceTerre + stat2.resistanceTerre;

    return statTotal;
  }

  getRandomStatistique(max: number) {
    return Math.floor(Math.random() * max);
  }
}
