import { Component, OnInit } from '@angular/core';
import { Monstre } from 'src/app/models/monstre';
import { Personnage } from 'src/app/models/personnage';
import { Zone } from 'src/app/models/zone';
import { Region } from 'src/app/utils/region';

@Component({
  selector: 'app-farm',
  templateUrl: './farm.component.html',
  styleUrls: ['./farm.component.css']
})
export class FarmComponent implements OnInit {

  farmActif: boolean = false;
  personnage: Personnage = new Personnage();
  zone: Zone = new Zone();

  constructor() { }

  ngOnInit(): void {


    this.personnage.id = 1;
    this.personnage.idStatistique = 1;
    this.personnage.niveau = 1;
    this.personnage.niveauOmega = 0;
    this.personnage.nom = "Personnage Test";

    this.zone.id = 1;
    this.zone.nom = 'Village d\'Astrub';
    this.zone.region = Region.Astrub;
  }

  farming(): void {
    this.farmActif = !this.farmActif;
  }
}
