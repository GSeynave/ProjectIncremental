import { Injectable } from '@angular/core';
import { Personnage } from '../models/personnage';

@Injectable({
  providedIn: 'root',
})
export class PersonnageService {
  personnage: Personnage = new Personnage();
  constructor() {
    this.personnage.id = 1;
    this.personnage.idStatistique = 1;
    this.personnage.niveau = 1;
    this.personnage.niveauOmega = 0;
    this.personnage.nom = 'ShOcK';
    this.personnage.zoneId = 1;
  }

  getPersonnageById(id: number) {
    return this.personnage;
  }

  setZoneId(zoneId: number) {
    this.personnage.zoneId = zoneId;
  }
  // TODO mettre ici les actions relatif aux personnage (update statistique.. ?)
}
