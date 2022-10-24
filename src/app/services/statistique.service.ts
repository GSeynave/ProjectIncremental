import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Equipement } from '../models/equipement';
import { Statistique } from '../models/statistique';
import { InventaireService } from './inventaire.service';

@Injectable({
  providedIn: 'root',
})
export class StatistiqueService {
  constructor(private inventaireService: InventaireService) {}

  getStatistiqueById(id: number): Observable<Statistique> {
    let statistique: Statistique = new Statistique();
    if (id === 22) {
      statistique.id = 22;
      // statistique.vie = 500;
      statistique.terre = 2;
      // statistique.feu = 200;
      // statistique.air = 200;
      // statistique.eau = 200;
      // statistique.sagesse = 200;
      // statistique.hate = 200;
      // statistique.puissance = 200;
      // statistique.dexterite = 200;
      // statistique.precision = 200;
      // statistique.energie = 200;
      // statistique.critiqueChance = 200;
      // statistique.critiqueDommage = 200;
      // statistique.resistanceTerre = 200;
      // statistique.resistanceFeu = 200;
      // statistique.resistanceAir = 200;
      // statistique.resistanceEau = 200;

      return of(statistique);
    }

    statistique.id = 50;
    statistique.vie = 20;
    (statistique.terre = 5), (statistique.feu = 5);
    statistique.air = 5;
    statistique.eau = 5;
    statistique.sagesse = 5;
    statistique.hate = 5;
    statistique.puissance = 5;
    statistique.dexterite = 5;
    statistique.precision = 5;
    statistique.energie = 5;
    statistique.critiqueChance = 5;
    statistique.critiqueDommage = 5;
    statistique.resistanceTerre = 5;
    statistique.resistanceFeu = 5;
    statistique.resistanceAir = 5;
    statistique.resistanceEau = 5;
    if (id == 50) {
      statistique.vie = 100;
    }
    return of(statistique);
  }

  getEquipementStatistiqueByPersonnage(
    personnageId: number
  ): Observable<Statistique> {
    let equipements: Equipement[] = [];
    this.inventaireService
      .getEquipementsByPersonnageId(personnageId)
      .subscribe((data) => (equipements = data));
    let statistiqueEquipement: Statistique = new Statistique();
    this.getStatiqueByEquipement(equipements).subscribe(
      (data) => (statistiqueEquipement = data)
    );
    return of(statistiqueEquipement);
  }

  private getStatiqueByEquipement(
    equipements: Equipement[]
  ): Observable<Statistique> {
    let statTotal: Statistique = new Statistique();
    equipements.forEach((equipement) => {
      let statTemp: Statistique = new Statistique();
      this.getStatistiqueById(equipement.id).subscribe(
        (data) => (statTemp = data)
      );
      let statistiqueMultiple: Statistique = new Statistique();
      this.getmultipleStatistiqueByEquipementQuantite(
        statTemp,
        equipement.quantite
      ).subscribe((data) => (statistiqueMultiple = data));
      this.addStatistiques(statTotal, statistiqueMultiple).subscribe(
        (data) => (statTotal = data)
      );
    });

    return of(statTotal);
  }

  getmultipleStatistiqueByEquipementQuantite(
    stat: Statistique,
    quantite: number
  ): Observable<Statistique> {
    let statTotal: Statistique = new Statistique();
    statTotal.vie = stat.vie * quantite;
    statTotal.energie = stat.energie * quantite;
    statTotal.feu = stat.feu * quantite;
    statTotal.air = stat.air * quantite;
    statTotal.eau = stat.eau * quantite;
    statTotal.terre = stat.terre * quantite;
    statTotal.sagesse = stat.sagesse * quantite;
    statTotal.puissance = stat.puissance * quantite;
    statTotal.hate = stat.hate * quantite;
    statTotal.dexterite = stat.dexterite * quantite;
    statTotal.precision = stat.precision * quantite;
    statTotal.critiqueChance = stat.critiqueChance * quantite;
    statTotal.critiqueDommage = stat.critiqueDommage * quantite;
    statTotal.resistanceAir = stat.resistanceAir * quantite;
    statTotal.resistanceEau = stat.resistanceEau * quantite;
    statTotal.resistanceFeu = stat.resistanceFeu * quantite;
    statTotal.resistanceTerre = stat.terre * quantite;

    return of(statTotal);
  }

  addStatistiques(
    stat1: Statistique,
    stat2: Statistique
  ): Observable<Statistique> {
    let statTotal: Statistique = new Statistique();
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

    return of(statTotal);
  }

  getRandomStatistique(max: number) {
    return Math.floor(Math.random() * max);
  }
}
