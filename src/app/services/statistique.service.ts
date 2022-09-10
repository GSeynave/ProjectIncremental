import { Injectable } from '@angular/core';
import { Statistique } from '../models/statistique';

@Injectable({
  providedIn: 'root'
})
export class StatistiqueService {

  constructor() { }

  getStatistiqueById(id: number): Statistique {
    let statistique: Statistique = new Statistique();
    statistique.resistanceAir = 5;
    statistique.resistanceTerre = 0;
    statistique.resistanceEau = 50;
    statistique.resistanceFeu = 15;
    return statistique;
  }
}
