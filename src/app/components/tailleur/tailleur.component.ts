import { Component, Input, OnInit } from '@angular/core';
import { Equipement } from 'src/app/models/equipement';
import { Metier } from 'src/app/models/metier';
import { Recette } from 'src/app/models/recette';
import { Ressource } from 'src/app/models/ressource';
import { InventaireService } from 'src/app/services/inventaire.service';
import { MetierService } from 'src/app/services/metier.service';

@Component({
  selector: 'app-tailleur',
  templateUrl: './tailleur.component.html',
  styleUrls: ['./tailleur.component.css'],
})
export class TailleurComponent implements OnInit {
  @Input('metier') metier: Metier = new Metier();

  recettes: Recette[] = [];

  constructor(
    private metierService: MetierService,
    private inventaireService: InventaireService
  ) {}

  ngOnInit(): void {
    this.metierService
      .getRecetteByMetierId(this.metier.id)
      .subscribe((data) => (this.recettes = data));
  }

  getEquipementByRecetteId(recetteId: number): string {
    let equipement: Equipement = new Equipement();
    this.metierService
      .getEquipementByRecetteId(recetteId)
      .subscribe((data) => (equipement = data));
    return equipement.nom;
  }

  craft(recette: Recette) {
    if (this.checkRessourcesQuantite(recette)) {
      this.craftEquipement(recette);
    } else {
      console.log('ressource insuffisante');
    }
  }

  checkRessourcesQuantite(recette: Recette): boolean {
    let recetteOk: boolean = true;
    recette.ressources.forEach((ressource) => {
      if (this.getQuantiteInInventaire(ressource) < ressource.quantite) {
        recetteOk = false;
      }
    });
    return recetteOk;
  }

  craftEquipement(recette: Recette) {
    let equipement: Equipement = new Equipement();
    this.metierService
      .getEquipementByRecetteId(recette.id)
      .subscribe((data) => (equipement = data));
    equipement.quantite = 1;
    this.inventaireService.updateInventaireEquipement(equipement);
    this.removeRessourceFromEquipement(recette);
  }

  removeRessourceFromEquipement(recette: Recette) {
    recette.ressources.forEach((ressource) => {
      // TODO fix idPersonnage !
      this.inventaireService.updateRessource(ressource, 1);
    });
  }
  getQuantiteInInventaire(ressource: Ressource): number {
    let quantite: number = 0;
    this.inventaireService
      // TODO fix id personnage
      .getQuantite(ressource, 1)
      .subscribe((data) => (quantite = data));
    return quantite;
  }
}
