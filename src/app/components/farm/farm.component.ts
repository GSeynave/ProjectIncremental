import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Personnage } from 'src/app/models/personnage';
import { Zone } from 'src/app/models/zone';
import { Region } from 'src/app/utils/region';

@Component({
  selector: 'app-farm',
  templateUrl: './farm.component.html',
  styleUrls: ['./farm.component.css']
})
export class FarmComponent implements OnInit, OnChanges {

  farmActif: boolean = false;
  personnage: Personnage = new Personnage();
  @Input('zoneTeleport') zoneTeleport: Zone = new Zone();

  constructor() { }

  ngOnInit(): void {
    this.personnage.id = 1;
    this.personnage.idStatistique = 1;
    this.personnage.niveau = 1;
    this.personnage.niveauOmega = 0;
    this.personnage.nom = "Personnage Test";

    this.zoneTeleport.id = 1;
    this.zoneTeleport.nom = 'Village d\'Astrub';
    this.zoneTeleport.region = Region.Astrub;
  }

  ngOnChanges(changes: SimpleChanges): void {
      if(changes['zoneTeleport'].currentValue != changes['zoneTeleport'].previousValue){
        this.zoneTeleport = changes['zoneTeleport'].currentValue;
        console.log('tp vers nouvelles zone:', this.zoneTeleport);

      }
  }

  farming(): void {
    this.farmActif = !this.farmActif;
  }
}
