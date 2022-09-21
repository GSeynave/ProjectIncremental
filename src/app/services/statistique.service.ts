import { Injectable } from '@angular/core';
import { Statistique } from '../models/statistique';

@Injectable({
  providedIn: 'root'
})
export class StatistiqueService {

  constructor() { }

  getStatistiqueById(id: number): Statistique {
    let statistique: Statistique = new Statistique();
    statistique.id = this.getRandomStatistique(10);
    statistique.vie = this.getRandomStatistique(20);
    statistique.force = this.getRandomStatistique(5);
    statistique.intelligence = this.getRandomStatistique(5);
    statistique.agilite = this.getRandomStatistique(5);
    statistique.chance = this.getRandomStatistique(5);
    statistique.sagesse = this.getRandomStatistique(5);
    statistique.initiative = this.getRandomStatistique(10);
    statistique.pa = this.getRandomStatistique(12);
    statistique.pm = this.getRandomStatistique(6);
    statistique.po = this.getRandomStatistique(6);
    statistique.energie = this.getRandomStatistique(2000);
    statistique.critiqueChance = this.getRandomStatistique(100);
    statistique.critiqueDommage = this.getRandomStatistique(5);
    statistique.resistanceTerre = this.getRandomStatistique(50);
    statistique.resistanceFeu = this.getRandomStatistique(50);
    statistique.resistanceAir = this.getRandomStatistique(50);
    statistique.resistanceEau = this.getRandomStatistique(50);
    return statistique;
  }

  getRandomStatistique(max: number) {
    return Math.floor(Math.random() * max);
  }
}
