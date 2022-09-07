import { Injectable } from '@angular/core';
import { Statistique } from '../models/statistique';
import { DatabaseService } from './database.service';

@Injectable({
  providedIn: 'root'
})
export class FarmService {

  constructor(private databaseService: DatabaseService) { }

  getDegatAuMonstre(personnageStatistique: Statistique, monstreStatistique: Statistique): number{
    const degatTerre: number = this.getDegat(personnageStatistique.force, monstreStatistique.resistanceTerre);
    const degatFeu: number = this.getDegat(personnageStatistique.intelligence, monstreStatistique.resistanceFeu);
    const degatAir: number = this.getDegat(personnageStatistique.agilite, monstreStatistique.resistanceAir);
    const degatEau: number = this.getDegat(personnageStatistique.chance, monstreStatistique.resistanceEau);
    //Ajout des dommage critique
    //ajout calcul dégat finaux via PA.
    return Math.round( (degatTerre + degatFeu + degatAir + degatEau) * 100) / 100;
  }

  getDegatAuPersonnage(monstreStatistique: Statistique, personnageStatistique: Statistique) {
    const degatTerre: number = this.getDegat(monstreStatistique.force, personnageStatistique.resistanceTerre);
    const degatFeu: number = this.getDegat(monstreStatistique.intelligence, personnageStatistique.resistanceFeu);
      const degatAir: number = this.getDegat(monstreStatistique.agilite, personnageStatistique.resistanceAir);
    const degatEau: number = this.getDegat(monstreStatistique.chance, personnageStatistique.resistanceEau);
    //Ajout des dommage critique
    //ajout calcul dégat finaux via PA.
    return Math.round( (degatTerre + degatFeu + degatAir + degatEau) * 100) / 100;
  }

  getDegat(statistique: number, resistance: number) : number {
    return (statistique / 10) - ((statistique / 10) / 100);
  }
}
