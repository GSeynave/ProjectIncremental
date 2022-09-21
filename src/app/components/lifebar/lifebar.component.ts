import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { Monstre } from 'src/app/models/monstre';
import { Personnage } from 'src/app/models/personnage';
import { Ressource } from 'src/app/models/ressource';
import { Statistique } from 'src/app/models/statistique';
import { Zone } from 'src/app/models/zone';
import { FarmService } from 'src/app/services/farm.service';
import { MonstreService } from 'src/app/services/monstre.service';
import { RessourceService } from 'src/app/services/ressource.service';
import { StatistiqueService } from 'src/app/services/statistique.service';

@Component({
  selector: 'app-lifebar',
  templateUrl: './lifebar.component.html',
  styleUrls: ['./lifebar.component.css']
})
export class LifebarComponent implements OnInit, OnChanges {

  @Input() farmActif: boolean = false;
  @Input() personnage: Personnage = new Personnage();
  @Input() zoneTeleport: Zone = new Zone();
  vie: number = 0;
  monstreActuel: Monstre = new Monstre();
  statistiquePersonnage: Statistique = new Statistique();
  statistiqueMonstre: Statistique = new Statistique();
  interval: ReturnType<typeof setInterval> | undefined;
  constructor(private farmService: FarmService, private monstreService: MonstreService, private statistiqueService: StatistiqueService, private ressourceService: RessourceService) { }

  ngOnInit(): void {
    if (this.farmActif && this.zoneTeleport.id != 0) {
      this.initFarm();
    }
  }

  initFarm() {
    this.clearFarm();
    this.statistiquePersonnage = this.statistiqueService.getStatistiqueById(this.personnage.idStatistique);
    this.farm();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['zoneTeleport'] && changes['zoneTeleport'].currentValue != changes['zoneTeleport'].previousValue) {
      this.clearFarm();
      this.zoneTeleport = changes['zoneTeleport'].currentValue;
      this.farm();
    }
  }

  farm() {
    this.getMonstreRandom();
    this.interval = setInterval(() => {
      const degatInflige: number = this.farmService.getDegatAuMonstre(this.statistiquePersonnage, this.statistiqueMonstre);
      this.vie -= degatInflige;
      (<HTMLInputElement>document.getElementById('vie')).value = this.vie.toFixed(2);
      if (this.vie <= 0) {
        this.getDrop();
        this.getMonstreRandom();
      }
      if (!this.farmActif) {
        this.clearFarm();
      }
    }, 1000);
  }

  getMonstreRandom() {
    let monstres: Monstre[] = this.monstreService.getMonstresByZoneId(this.zoneTeleport.id);
    this.monstreActuel = monstres[Math.floor(Math.random() * monstres.length)];
    this.statistiqueMonstre = this.statistiqueService.getStatistiqueById(this.monstreActuel.idStatistique);
    this.vie = this.statistiqueMonstre.vie;
  }

  getDrop() {
    let ressources: Ressource[] = this.ressourceService.getRessourcesByMonstreId(this.monstreActuel.id);
    ressources.forEach((ressource) => {
      if (Math.floor(Math.random() * 100) < ressource.tauxDrop) {
        console.log("vous avez droppez ", ressource.nom);
      }
    });
  }

  clearFarm(): void {
    this.monstreActuel = new Monstre();
    this.statistiqueMonstre = new Statistique();
    clearInterval(this.interval);
  }
}
