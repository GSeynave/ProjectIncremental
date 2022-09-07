import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Monstre } from 'src/app/models/monstre';
import { Personnage } from 'src/app/models/personnage';
import { Ressource } from 'src/app/models/ressource';
import { Statistique } from 'src/app/models/statistique';
import { Zone } from 'src/app/models/zone';
import { DatabaseService } from 'src/app/services/database.service';
import { FarmService } from 'src/app/services/farm.service';

@Component({
  selector: 'app-lifebar',
  templateUrl: './lifebar.component.html',
  styleUrls: ['./lifebar.component.css']
})
export class LifebarComponent implements OnInit, OnDestroy {

  @Input() farmActif: boolean = false;
  @Input() personnage: Personnage = new Personnage();
  @Input() zone: Zone = new Zone();
  vie: number = 0;
  monstreActuel: Monstre = new Monstre();
  statistiquePersonnage: Statistique = new Statistique();
  statistiqueMonstre: Statistique = new Statistique();
  interval: ReturnType<typeof setInterval> | undefined;
  constructor(private farmService: FarmService, private databaseService: DatabaseService) { }

  ngOnInit(): void {
    if (this.farmActif) {
      this.statistiquePersonnage = this.databaseService.getStatistiqueById(this.personnage.idStatistique);
      this.farm();
    } else {
      this.ngOnDestroy();
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
        this.ngOnDestroy();
      }
    }, 1000);
  }

  getMonstreRandom() {
    let monstres: Monstre[] = this.databaseService.getMonstreFromZone(this.zone);
    this.monstreActuel = monstres[Math.floor(Math.random() * monstres.length)];
    this.statistiqueMonstre = this.databaseService.getStatistiqueById(this.monstreActuel.idStatistique);
    this.vie = this.statistiqueMonstre.vie;
  }

  getDrop(){
    let ressources: Ressource[] = this.databaseService.getDrop(this.monstreActuel);
    ressources.forEach( (ressource) => {
      console.log("vous avez droppez ", ressource.nom);
    });
  }

  ngOnDestroy(): void {
    clearInterval(this.interval);

  }
}
