import { Injectable } from '@angular/core';
import { Equipement } from '../models/equipement';
import { Statistique } from '../models/statistique';
import { DatabaseService } from './database.service';

@Injectable({
  providedIn: 'root'
})
export class FarmService {

  constructor(private databaseService: DatabaseService) { }

  getDegatAuMonstre(personnageStatistique: Statistique, equipementStatistique: Statistique, monstreStatistique: Statistique): number{
    const degatTerre: number = this.getDegat(personnageStatistique.terre, equipementStatistique.terre, monstreStatistique.resistanceTerre);
    const degatFeu: number = this.getDegat(personnageStatistique.feu, equipementStatistique.feu, monstreStatistique.resistanceFeu);
    const degatAir: number = this.getDegat(personnageStatistique.air, equipementStatistique.air, monstreStatistique.resistanceAir);
    const degatEau: number = this.getDegat(personnageStatistique.eau, equipementStatistique.eau, monstreStatistique.resistanceEau);
    //Ajout des dommage critique
    return Math.round( (degatTerre + degatFeu + degatAir + degatEau) * 100) / 100;
  }

  getDegatAuPersonnage(monstreStatistique: Statistique, equipementStatistique: Statistique, personnageStatistique: Statistique) {
    const degatTerre: number = this.getDegat(monstreStatistique.terre, equipementStatistique.terre, personnageStatistique.resistanceTerre);
    const degatFeu: number = this.getDegat(monstreStatistique.feu, equipementStatistique.feu, personnageStatistique.resistanceFeu);
    const degatAir: number = this.getDegat(monstreStatistique.air, equipementStatistique.air, personnageStatistique.resistanceAir);
    const degatEau: number = this.getDegat(monstreStatistique.eau, equipementStatistique.eau, personnageStatistique.resistanceEau);
    //Ajout des dommage critique
    return Math.round( (degatTerre + degatFeu + degatAir + degatEau) * 100) / 100;
  }

  getDegat(statistiquePersonnage: number, statistiqueEquipement: number, resistance: number) : number {
    let degatPersonnage: number = ( (statistiquePersonnage + statistiqueEquipement) / 10);
    return  degatPersonnage - ((degatPersonnage * resistance) / 100);
  }
}
