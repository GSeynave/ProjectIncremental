import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Zone } from 'src/app/models/zone';
import { ZoneService } from 'src/app/services/zone.service';

@Component({
  selector: 'app-portail',
  templateUrl: './portail.component.html',
  styleUrls: ['./portail.component.css']
})
export class PortailComponent implements OnInit {

  zones: Zone[] = [];
  @Output() zoneTeleport: EventEmitter<Zone> = new EventEmitter<Zone>();
  constructor(private zoneService: ZoneService) { }

  ngOnInit(): void {
    this.zones = this.zoneService.getZones();
  }

  utiliserPortail(zoneTeleport: Zone) {
    this.zoneTeleport.emit(zoneTeleport);
  }
}
