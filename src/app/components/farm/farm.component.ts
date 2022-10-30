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
import { Zone } from 'src/app/models/zone';
import { PersonnageService } from 'src/app/services/personnage.service';

@Component({
  selector: 'app-farm',
  templateUrl: './farm.component.html',
  styleUrls: ['./farm.component.css'],
})
export class FarmComponent implements OnInit, OnChanges {
  @Input() personnage: Personnage = new Personnage();
  @Input() zone: Zone = new Zone();
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
    private personnageService: PersonnageService,
    private zoneService: ZoneService
  ) {}

  ngOnInit(): void {
    this.initFarm();
  }

  initFarm() {
    console.log('init farm this.zone id', this.zone.id);
    if (this.zone.id != 0) {
      this.clearFarm();
      this.getMonstreRandom();
      this.farm();
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (
      changes['zone'] &&
      changes['zone'].currentValue != changes['zone'].previousValue
    ) {
      console.log('zone changed', changes);
      this.zone = changes['zone'].currentValue;
      this.initFarm();
    }

    if (
      changes['personnage'] &&
      changes['personnage'].currentValue != changes['personnage'].previousValue
    ) {
      this.personnage = changes['personnage'].currentValue;
    }
  }

  async farm() {
    await this.updateStatitistique();
    this.interval = setInterval(() => {
      this.roundIntervalTick();
    }, 1000);
  }

  roundIntervalTick(): void {
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

  async updateStatitistique() {
    this.personnageService
      .getPersonnageStatistique(this.personnage.id)
      .then((res) => {
        this.statistiquePersonnage = res;
        this.viePersonnage = this.statistiquePersonnage.vie;
      });
  }

  async attackToMonstre() {
    const degatInflige: number = await this.farmService.getDegatInflige(
      this.statistiquePersonnage,
      this.statistiqueMonstre
    );
    this.vieMonstre -= degatInflige;
    if (this.vieMonstre < 0) this.vieMonstre = 0;
    this.updateLifeHtmlEntity(
      'vieMonstre',
      this.vieMonstre,
      this.statistiqueMonstre.vie
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

  async attackToPersonnage() {
    const degatRecu = await this.farmService.getDegatInflige(
      this.statistiqueMonstre,
      this.statistiquePersonnage
    );
    this.viePersonnage -= degatRecu;
    if (this.viePersonnage < 0) this.viePersonnage = 0;
    this.updateLifeHtmlEntity(
      'viePersonnage',
      this.viePersonnage,
      this.statistiquePersonnage.vie
    );
  }

  getMonstreRandom() {
    let monstres: Monstre[] = [];
    this.monstreService.getMonstresByZoneId(this.zone.id).subscribe((data) => {
      monstres = data;
      this.monstreActuel =
        monstres[Math.floor(Math.random() * monstres.length)];
      this.statistiqueService
        .getStatistiqueById(this.monstreActuel.idStatistique)
        .subscribe((data) => {
          this.statistiqueMonstre = data;
          this.vieMonstre = this.statistiqueMonstre.vie;
        });
    });
  }

  getDrop() {
    let ressources: Ressource[] = [];
    this.ressourceService
      .getRessourcesByMonstreId(this.monstreActuel.id)
      .subscribe((data) => (ressources = data));
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
    this.updateStatitistique();
    this.getDrop();
    this.getMonstreRandom();
  }

  getPercentVie(vieActuelle: number, vieMax: number) {
    return (100 * vieActuelle) / vieMax;
  }
}
