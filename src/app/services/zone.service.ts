import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Zone } from '../models/zone';

@Injectable({
  providedIn: 'root',
})
export class ZoneService {
  constructor() {}

  getZones(): Observable<Zone[]> {
    let zones: Zone[] = [];
    let zone1: Zone = new Zone();
    zone1.id = 1;
    zone1.nom = 'Cimietière hanté';
    let zone2: Zone = new Zone();
    zone2.id = 2;
    zone2.nom = 'Forêt enchantée';
    let zone3: Zone = new Zone();
    zone3.id = 3;
    zone3.nom = 'Plaine devastée';
    zones.push(zone1);
    zones.push(zone2);
    zones.push(zone3);
    return of(zones);
  }

  getNomZone(zoneId: number): Observable<string> {
    let zone: string = '';
    if (zoneId == 1) {
      zone = 'Cimetière hanté';
    } else if (zoneId == 2) {
      zone = 'Forêt enchantée';
    } else if (zoneId == 3) {
      zone = 'Plaine devastée';
    }
    return of(zone);
  }
}
