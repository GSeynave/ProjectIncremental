import { Injectable } from '@angular/core';
import { Statistique } from '../models/statistique';

@Injectable({
  providedIn: 'root',
})
export class FarmService {
  constructor() {}

  getDegatInflige(
    personnageStatistique: Statistique,
    monstreStatistique: Statistique
  ): number {
    const degatTerre: number = this.getDegat(
      personnageStatistique.terre,
      monstreStatistique.resistanceTerre
    );
    const degatFeu: number = this.getDegat(
      personnageStatistique.feu,
      monstreStatistique.resistanceFeu
    );
    const degatAir: number = this.getDegat(
      personnageStatistique.air,
      monstreStatistique.resistanceAir
    );
    const degatEau: number = this.getDegat(
      personnageStatistique.eau,
      monstreStatistique.resistanceEau
    );
    //Ajout des dommage critique
    return Math.round((degatTerre + degatFeu + degatAir + degatEau) * 10) / 100;
  }

  getDegat(statistiquePersonnage: number, resistance: number): number {
    let degatPersonnage: number = statistiquePersonnage / 10;
    return degatPersonnage - (degatPersonnage * resistance) / 100;
  }
}
