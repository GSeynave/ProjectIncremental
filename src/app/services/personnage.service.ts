import { Injectable } from '@angular/core';
import { Personnage } from '../models/personnage';

@Injectable({
  providedIn: 'root'
})
export class PersonnageService {

  constructor() { }

  getPersonnageById(id: number) {
    let personnage: Personnage = new Personnage();
    personnage.id = id;
    personnage.idStatistique = 1;
    personnage.niveau = 1;
    personnage.niveauOmega = 0;
    personnage.nom = "ShOcK";
    return personnage;
  }
}
