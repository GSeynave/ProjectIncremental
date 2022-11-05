import { Component, OnInit } from '@angular/core';
import { Equipement } from 'src/app/models/equipement';
import { Inventaire } from 'src/app/models/inventaire';
import { Ressource } from 'src/app/models/ressource';
import { InventaireService } from 'src/app/services/inventaire.service';

@Component({
  selector: 'app-inventaire',
  templateUrl: './inventaire.component.html',
  styleUrls: ['./inventaire.component.css'],
})
export class InventaireComponent implements OnInit {
  interval: ReturnType<typeof setInterval> | undefined;
  inventaireRessource: Ressource[] = [];
  inventaireEquipement: Equipement[] = [];

  constructor(private inventaireService: InventaireService) {}

  ngOnInit(): void {
    this.interval = setInterval(() => {
      // TODO fix perso id
      this.inventaireService.getInventaireRessource(1).subscribe((data) => {
        console.log('data', data);
        data.forEach((res) => {
          let ressource: Ressource = new Ressource();
          ressource.nom = res.nom;
          ressource.quantite = res.quantite;
          this.inventaireRessource.push(ressource);
        });
      });
      this.inventaireService.getInventaireEquipement().subscribe((data) => {
        this.inventaireEquipement = data;
      });
    }, 100);
  }
}
