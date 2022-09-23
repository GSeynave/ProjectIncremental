import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Personnage } from 'src/app/models/personnage';
import { Zone } from 'src/app/models/zone';
import { PersonnageService } from 'src/app/services/personnage.service';
import { Region } from 'src/app/utils/region';

@Component({
  selector: 'app-personnage-farm',
  templateUrl: './personnage-farm.component.html',
  styleUrls: ['./personnage-farm.component.css']
})
export class PersonnageFarmComponent implements OnInit, OnChanges {

  farmActif: boolean = false;
  personnage: Personnage = new Personnage();
  @Input('zoneTeleport') zoneTeleport: Zone = new Zone();

  constructor(private personnageService: PersonnageService) { }

  ngOnInit(): void {
    this.personnage = this.personnageService.getPersonnageById(1);
    console.log('personnage recupéré : ', this.personnage);
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
