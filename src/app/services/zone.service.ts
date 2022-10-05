import { Injectable } from '@angular/core';
import { Zone } from '../models/zone';

@Injectable({
  providedIn: 'root'
})
export class ZoneService {

  constructor() { }

  getZones() : Zone[] {

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
    return zones;
  }
}
