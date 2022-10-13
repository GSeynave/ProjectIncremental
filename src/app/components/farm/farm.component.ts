import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Monstre } from 'src/app/models/monstre';
import { Personnage } from 'src/app/models/personnage';
import { Ressource } from 'src/app/models/ressource';
import { Statistique } from 'src/app/models/statistique';
import { Zone } from 'src/app/models/zone';
import { FarmService } from 'src/app/services/farm.service';
import { InventaireService } from 'src/app/services/inventaire.service';
import { MonstreService } from 'src/app/services/monstre.service';
import { RessourceService } from 'src/app/services/ressource.service';
import { StatistiqueService } from 'src/app/services/statistique.service';
import { ZoneService } from 'src/app/services/zone.service';

@Component({
  selector: 'app-farm',
  templateUrl: './farm.component.html',
  styleUrls: ['./farm.component.css']
})
export class FarmComponent implements OnInit, OnChanges {

  @Input() personnage: Personnage = new Personnage();
  @Input() zoneId: number = 0;
  viePersonnage: number = 0;
  vieMonstre: number = 0;
  monstreActuel: Monstre = new Monstre();
  statistiquePersonnage: Statistique = new Statistique();
  statistiqueEquipement: Statistique = new Statistique();
  statistiqueMonstre: Statistique = new Statistique();
  interval: ReturnType<typeof setInterval> | undefined;
  constructor(private farmService: FarmService, private monstreService: MonstreService, private statistiqueService: StatistiqueService, private ressourceService: RessourceService, private inventaireService: InventaireService, private zoneService: ZoneService) { }

  ngOnInit(): void {
    this.statistiquePersonnage = this.statistiqueService.getStatistiqueById(50);
    this.viePersonnage = this.statistiquePersonnage.vie;
    this.initFarm();
  }

  initFarm() {
    if (this.zoneId != 0) {
      this.clearFarm();
      this.farm();
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['zoneId'] && changes['zoneId'].currentValue != changes['zoneId'].previousValue) {
      this.zoneId = changes['zoneId'].currentValue;
      this.initFarm();
    }

    if (changes['personnage'] && changes['personnage'].currentValue != changes['personnage'].previousValue) {
      this.personnage = changes['personnage'].currentValue;
    }
  }

  farm() {
    this.getMonstreRandom();
    this.interval = setInterval(() => {

      this.statistiquePersonnage = this.statistiqueService.getStatistiqueById(50);
      this.statistiqueEquipement = this.statistiqueService.getEquipementStatistiqueByPersonnage(this.personnage.id);
      console.log('stat perso:', this.statistiquePersonnage);
      const degatInflige: number = this.farmService.getDegatAuMonstre(this.statistiquePersonnage, this.statistiqueEquipement, this.statistiqueMonstre);
      this.vieMonstre -= degatInflige;
      console.log('degat inflige : ', degatInflige);

      (<HTMLInputElement>document.getElementById('vieMonstre')).value = ((100 * this.vieMonstre) / this.statistiqueMonstre.vie).toFixed(1);
      const degatRecu: number = this.farmService.getDegatAuPersonnage(this.statistiqueMonstre, this.statistiqueEquipement, this.statistiquePersonnage);
      this.viePersonnage -= degatRecu;
      console.log('degat recu: ', degatRecu);
      (<HTMLInputElement>document.getElementById('viePersonnage')).value = ((100 * this.viePersonnage) / this.statistiquePersonnage.vie).toFixed(1);
      if(this.viePersonnage <= 0) {
        this.clearFarm();
      }
      if (this.vieMonstre <= 0) {
        this.getDrop();
        this.getMonstreRandom();
      }
    }, 1000);
  }

  getMonstreRandom() {
    let monstres: Monstre[] = this.monstreService.getMonstresByZoneId(this.zoneId);
    this.monstreActuel = monstres[Math.floor(Math.random() * monstres.length)];
    this.statistiqueMonstre = this.statistiqueService.getStatistiqueById(this.monstreActuel.idStatistique);
    this.vieMonstre = this.statistiqueMonstre.vie;
  }

  getDrop() {
    let ressources: Ressource[] = this.ressourceService.getRessourcesByMonstreId(this.monstreActuel.id);
    ressources.forEach((ressource) => {
      if (Math.floor(Math.random() * 100) < ressource.tauxDrop) {
        ressource.quantite = 1;
        this.inventaireService.addRessource(ressource);
      }
    });
  }

  clearFarm(): void {
    this.monstreActuel = new Monstre();
    this.statistiqueMonstre = new Statistique();
    this.vieMonstre = 0;
    clearInterval(this.interval);
  }

  getVieMonstre() {
    return 100 * this.vieMonstre / this.statistiqueMonstre.vie;
  }

  getViePersonnage() {
    return 100 * this.viePersonnage / this.statistiquePersonnage.vie;
  }

  getNomZone(zoneId: number) {
    return this.zoneService.getNomZone(zoneId);
  }
}
