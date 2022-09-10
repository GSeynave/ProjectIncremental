import { Injectable } from '@angular/core';
import { Monstre } from '../models/monstre';

@Injectable({
  providedIn: 'root'
})
export class MonstreService {

  constructor() { }

  getMonstresByZoneId(zoneId: number): Monstre[] {
    let monstres: Monstre[] = [];
    let monstre1: Monstre = new Monstre();
    let monstre2: Monstre = new Monstre();
    let monstre3: Monstre = new Monstre();
    if (zoneId == 1) {
      monstre1.id = 1;
      monstre1.idStatistique = 1;
      monstre1.idZone = 1;
      monstre1.nom = 'Arakne';
      monstre2.id = 2;
      monstre2.idStatistique = 2;
      monstre2.idZone = 1;
      monstre2.nom = 'Champ Champ';
      monstre3.id = 3;
      monstre3.idStatistique = 3;
      monstre3.idZone = 1;
      monstre3.nom = 'Moskito';
    } else if (zoneId == 2) {
      monstre1.id = 4;
      monstre1.idStatistique = 1;
      monstre1.idZone = 2;
      monstre1.nom = 'Bouftou';
      monstre2.id = 5;
      monstre2.idStatistique = 2;
      monstre2.idZone = 2;
      monstre2.nom = 'Boufton Blanc';
      monstre3.id = 6;
      monstre3.idStatistique = 3;
      monstre3.idZone = 2;
      monstre3.nom = 'Boufton Noir';
    } else if (zoneId == 3) {
      monstre1.id = 7;
      monstre1.idStatistique = 1;
      monstre1.idZone = 3;
      monstre1.nom = 'Piou Bleu';
      monstre2.id = 8;
      monstre2.idStatistique = 2;
      monstre2.idZone = 3;
      monstre2.nom = 'Piou Jaune';
      monstre3.id = 9;
      monstre3.idStatistique = 3;
      monstre3.idZone = 3;
      monstre3.nom = 'Piou Rose';
    }
    monstres.push(monstre1);
    monstres.push(monstre2);
    monstres.push(monstre3);
    return monstres;

  }
}
