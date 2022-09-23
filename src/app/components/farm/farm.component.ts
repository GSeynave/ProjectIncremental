import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Monstre } from 'src/app/models/monstre';
import { Personnage } from 'src/app/models/personnage';
import { Ressource } from 'src/app/models/ressource';
import { Statistique } from 'src/app/models/statistique';
import { Zone } from 'src/app/models/zone';
import { FarmService } from 'src/app/services/farm.service';
import { InventaireRessourceService } from 'src/app/services/inventaire-ressource.service';
import { MonstreService } from 'src/app/services/monstre.service';
import { RessourceService } from 'src/app/services/ressource.service';
import { StatistiqueService } from 'src/app/services/statistique.service';

@Component({
  selector: 'app-farm',
  templateUrl: './farm.component.html',
  styleUrls: ['./farm.component.css']
})
export class FarmComponent implements OnInit, OnChanges {

  @Input() personnage: Personnage = new Personnage();
  @Input() zoneTeleport: Zone = new Zone();
  viePersonnage: number = 0;
  vieMonstre: number = 0;
  monstreActuel: Monstre = new Monstre();
  statistiquePersonnage: Statistique = new Statistique();
  statistiqueMonstre: Statistique = new Statistique();
  interval: ReturnType<typeof setInterval> | undefined;
  constructor(private farmService: FarmService, private monstreService: MonstreService, private statistiqueService: StatistiqueService, private ressourceService: RessourceService, private inventaireRessourceService: InventaireRessourceService) { }

  ngOnInit(): void {
  }

  initFarm() {
    if (this.zoneTeleport.id != 0) {
      this.clearFarm();
      this.statistiquePersonnage = this.statistiqueService.getStatistiqueById(this.personnage.idStatistique);
      this.farm();
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['zoneTeleport'] && changes['zoneTeleport'].currentValue != changes['zoneTeleport'].previousValue) {
      this.zoneTeleport = changes['zoneTeleport'].currentValue;
      this.initFarm();
    }

    if (changes['personnage'] && changes['personnage'].currentValue != changes['personnage'].previousValue) {
      this.personnage = changes['personnage'].currentValue;
    }
  }

  farm() {
    this.statistiquePersonnage.force = 50;
    this.getMonstreRandom();
    this.interval = setInterval(() => {
      const degatInflige: number = this.farmService.getDegatAuMonstre(this.statistiquePersonnage, this.statistiqueMonstre);
      this.vieMonstre -= degatInflige;
      (<HTMLInputElement>document.getElementById('vieMonstre')).value = ( (100 * this.vieMonstre) / this.statistiqueMonstre.vie).toFixed(1);
      if (this.vieMonstre <= 0) {
        this.getDrop();
        this.getMonstreRandom();
      }
    }, 1000);
  }

  getMonstreRandom() {
    let monstres: Monstre[] = this.monstreService.getMonstresByZoneId(this.zoneTeleport.id);
    this.monstreActuel = monstres[Math.floor(Math.random() * monstres.length)];
    this.statistiqueMonstre = this.statistiqueService.getStatistiqueById(this.monstreActuel.idStatistique);
    this.vieMonstre = this.statistiqueMonstre.vie;
  }

  getDrop() {
    let ressources: Ressource[] = this.ressourceService.getRessourcesByMonstreId(this.monstreActuel.id);
    ressources.forEach((ressource) => {
      if (Math.floor(Math.random() * 100) < ressource.tauxDrop) {
        this.inventaireRessourceService.updateInventaireRessource(ressource, 1);
      }
    });
  }

  clearFarm(): void {
    this.monstreActuel = new Monstre();
    this.statistiqueMonstre = new Statistique();
    clearInterval(this.interval);
  }

  getVieMonstre() {
    return 100 * this.vieMonstre / this.statistiqueMonstre.vie;
  }
}
