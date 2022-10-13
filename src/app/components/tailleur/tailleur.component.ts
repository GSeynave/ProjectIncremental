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
  styleUrls: ['./tailleur.component.css']
})
export class TailleurComponent implements OnInit {

  @Input('metier') metier: Metier = new Metier();

  recettes: Recette[] = [];

  constructor(private metierService: MetierService, private inventaireService: InventaireService) { }

  ngOnInit(): void {
    this.recettes = this.metierService.getRecetteByMetierId(this.metier.id);
    console.log(this.recettes);

  }

  getEquipementByRecetteId(recetteId: number): string {
    let equipement: Equipement = this.metierService.getEquipementByRecetteId(recetteId);
    return equipement.nom;
  }

  craft(recette: Recette) {
    console.log('recette : ', recette);

    let recetteOk: boolean = true;
    recette.ressources.forEach(ressource => {
      if (this.getQuantite(ressource) < ressource.quantite) {
        recetteOk = false;
      }
    });

    if (recetteOk) {
      let equipement: Equipement = this.metierService.getEquipementByRecetteId(recette.id);
      equipement.quantite = 1;
      this.inventaireService.updateInventaireEquipement(equipement);
      recette.ressources.forEach(ressource => {
        this.inventaireService.removeRessource(ressource);
      })
    } else {
      console.log('ressource insuffisante');

    }
  }

  getQuantite(ressource: Ressource): number {
    return this.inventaireService.getQuantite(ressource);
  }
}
