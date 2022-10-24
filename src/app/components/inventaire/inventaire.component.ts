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
      this.inventaireService.getInventaireRessource().subscribe((data) => {
        this.inventaireRessource = data;
      });
      this.inventaireService.getInventaireEquipement().subscribe((data) => {
        this.inventaireEquipement = data;
      });
    }, 100);
  }
}
