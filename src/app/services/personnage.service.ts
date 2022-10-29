import { Injectable } from '@angular/core';
import { Equipement } from '../models/equipement';
import { Personnage } from '../models/personnage';
import { Statistique } from '../models/statistique';
import { InventaireService } from './inventaire.service';
import { StatistiqueService } from './statistique.service';

@Injectable({
  providedIn: 'root',
})
export class PersonnageService {
  personnage: Personnage = new Personnage();
  constructor(
    private statistiqueService: StatistiqueService,
    private inventaireService: InventaireService
  ) {
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

  getPersonnageStatistique(id: number) {
    // get statistique du personnage

    let statistiquePerso: Statistique = new Statistique();
    this.statistiqueService.getStatistiqueById(id).subscribe((data) => {
      statistiquePerso = data;
    });
    // get statistique des equipement
    let statistiqueEquipement = new Statistique();
    /*
    this.inventaireService.getInventaireEquipement().subscribe((dataEquip) => {
      let equipements: Equipement[] = [];
      equipements = dataEquip;
      let statistiqueEquipements: Statistique = new Statistique();
      equipements.forEach((equipement) => {
        this.statistiqueService
          .getStatistiqueById(equipement.statistiqueId)
          .subscribe((dataStat) => {
            this.statistiqueService.addStatistiques(
              statistiqueEquipements,
              dataStat
            );
          });
      });
    });
*/
    return this.statistiqueService.addStatistiques(
      statistiquePerso,
      statistiqueEquipement
    );
  }

  setZoneId(zoneId: number) {
    this.personnage.zoneId = zoneId;
  }
  // TODO mettre ici les actions relatif aux personnage (update statistique.. ?)
}
