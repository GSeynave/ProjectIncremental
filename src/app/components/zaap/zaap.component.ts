import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Zone } from 'src/app/models/zone';
import { ZoneService } from 'src/app/services/zone.service';

@Component({
  selector: 'app-zaap',
  templateUrl: './zaap.component.html',
  styleUrls: ['./zaap.component.css']
})
export class ZaapComponent implements OnInit {

  zones: Zone[] = [];
  @Output() zoneTeleport: EventEmitter<Zone> = new EventEmitter<Zone>();
  constructor(private zoneService: ZoneService) { }

  ngOnInit(): void {
    this.zones = this.zoneService.getZones();
  }

  utiliserZaap(zoneTeleport: Zone) {
    this.zoneTeleport.emit(zoneTeleport);
  }
}
