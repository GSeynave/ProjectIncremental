import { Component, Input, OnInit } from '@angular/core';
import { Zone } from 'src/app/models/zone';
import { PersonnageService } from 'src/app/services/personnage.service';

@Component({
  selector: 'app-zone',
  templateUrl: './zone.component.html',
  styleUrls: ['./zone.component.css'],
})
export class ZoneComponent implements OnInit {
  @Input('zone') zone: Zone = new Zone();
  constructor(private personnageService: PersonnageService) {}

  ngOnInit(): void {}

  utiliserPortail(zoneTeleport: Zone) {
    console.log('utilisation du portail', zoneTeleport);
    this.personnageService.setZoneId(zoneTeleport.id);
  }
}
