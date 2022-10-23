import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Zone } from 'src/app/models/zone';
import { PersonnageService } from 'src/app/services/personnage.service';
import { ZoneService } from 'src/app/services/zone.service';

@Component({
  selector: 'app-zone',
  templateUrl: './zone.component.html',
  styleUrls: ['./zone.component.css']
})
export class ZoneComponent implements OnInit {

  @Input('zone') zone: Zone = new Zone();
  constructor(private personnageService: PersonnageService) { }

  ngOnInit(): void {
  }

  utiliserPortail(zoneTeleport: Zone){
    this.personnageService.setZoneId(zoneTeleport.id);
  }
}
