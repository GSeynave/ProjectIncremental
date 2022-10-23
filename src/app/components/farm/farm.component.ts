import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { Monstre } from 'src/app/models/monstre';
import { Personnage } from 'src/app/models/personnage';
import { Ressource } from 'src/app/models/ressource';
import { Statistique } from 'src/app/models/statistique';
import { FarmService } from 'src/app/services/farm.service';
import { InventaireService } from 'src/app/services/inventaire.service';
import { MonstreService } from 'src/app/services/monstre.service';
import { RessourceService } from 'src/app/services/ressource.service';
import { StatistiqueService } from 'src/app/services/statistique.service';
import { ZoneService } from 'src/app/services/zone.service';

@Component({
  selector: 'app-farm',
  templateUrl: './farm.component.html',
  styleUrls: ['./farm.component.css'],
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
  constructor(
    private farmService: FarmService,
    private monstreService: MonstreService,
    private statistiqueService: StatistiqueService,
    private ressourceService: RessourceService,
    private inventaireService: InventaireService,
    private zoneService: ZoneService
  ) {}

  ngOnInit(): void {
    this.statistiquePersonnage = this.statistiqueService.getStatistiqueById(50);
    this.viePersonnage = this.statistiquePersonnage.vie;
    this.initFarm();
  }

  initFarm() {
    if (this.zoneId != 0) {
      this.clearFarm();
      this.getMonstreRandom();
      this.farm();
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (
      changes['zoneId'] &&
      changes['zoneId'].currentValue != changes['zoneId'].previousValue
    ) {
      this.zoneId = changes['zoneId'].currentValue;
      this.initFarm();
    }

    if (
      changes['personnage'] &&
      changes['personnage'].currentValue != changes['personnage'].previousValue
    ) {
      this.personnage = changes['personnage'].currentValue;
    }
  }

  farm() {
    this.interval = setInterval(() => {
      this.roundIntervalTick();
    }, 1000);
  }

  roundIntervalTick(): void {
    this.updateStatitistique();
    this.attackToMonstre();
    this.attackToPersonnage();
    this.endRoundCheck();
  }

  endRoundCheck(): void {
    if (this.viePersonnage <= 0) {
      this.mortPersonnageTrt();
    } else if (this.vieMonstre <= 0) {
      this.mortMonstreTrt();
    }
  }

  updateStatitistique(): void {
    this.statistiquePersonnage = this.statistiqueService.getStatistiqueById(50);
    this.statistiqueEquipement =
      this.statistiqueService.getEquipementStatistiqueByPersonnage(
        this.personnage.id
      );
  }

  attackToMonstre(): void {
    const degatInflige: number = this.getDegatPersonnage();
    this.vieMonstre -= degatInflige;
    this.updateLifeHtmlEntity(
      'vieMonstre',
      this.vieMonstre,
      this.statistiqueMonstre.vie
    );
  }

  getDegatPersonnage(): number {
    return this.farmService.getDegatAuMonstre(
      this.statistiquePersonnage,
      this.statistiqueEquipement,
      this.statistiqueMonstre
    );
  }

  updateLifeHtmlEntity(
    idHtml: string,
    vieEntity: number,
    vieMaxEntity: number
  ): void {
    (<HTMLInputElement>document.getElementById(idHtml)).value = (
      (100 * vieEntity) /
      vieMaxEntity
    ).toFixed(1);
  }

  attackToPersonnage(): void {
    const degatRecu = this.getDegatMonstre();
    this.viePersonnage -= degatRecu;
    this.updateLifeHtmlEntity(
      'viePersonnage',
      this.viePersonnage,
      this.statistiquePersonnage.vie
    );
  }

  getDegatMonstre() {
    return this.farmService.getDegatAuPersonnage(
      this.statistiqueMonstre,
      this.statistiqueEquipement,
      this.statistiquePersonnage
    );
  }

  getMonstreRandom() {
    let monstres: Monstre[] = this.monstreService.getMonstresByZoneId(
      this.zoneId
    );
    this.monstreActuel = monstres[Math.floor(Math.random() * monstres.length)];
    this.statistiqueMonstre = this.statistiqueService.getStatistiqueById(
      this.monstreActuel.idStatistique
    );
    this.vieMonstre = this.statistiqueMonstre.vie;
  }

  getDrop() {
    let ressources: Ressource[] =
      this.ressourceService.getRessourcesByMonstreId(this.monstreActuel.id);
    ressources.forEach((ressource) => {
      if (Math.floor(Math.random() * 100) <= ressource.tauxDrop) {
        ressource.quantite = 1;
        this.inventaireService.addRessource(ressource);
      }
    });
  }

  clearFarm(): void {
    this.monstreActuel = new Monstre();
    this.statistiqueMonstre = new Statistique();
    clearInterval(this.interval);
  }

  mortPersonnageTrt(): void {
    this.clearFarm();
  }

  mortMonstreTrt(): void {
    this.getDrop();
    this.getMonstreRandom();
  }

  getPercentVieMonstre() {
    return (100 * this.vieMonstre) / this.statistiqueMonstre.vie;
  }

  getPercentViePersonnage() {
    return (100 * this.viePersonnage) / this.statistiquePersonnage.vie;
  }

  getNomZone(zoneId: number) {
    return this.zoneService.getNomZone(zoneId);
  }
}
