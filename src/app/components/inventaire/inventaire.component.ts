import { Component, OnInit } from '@angular/core';
import { interval } from 'rxjs';
import { Equipement } from 'src/app/models/equipement';
import { Inventaire } from 'src/app/models/inventaire';
import { InventaireRessource } from 'src/app/models/inventaire-ressource';
import { InventaireService } from 'src/app/services/inventaire.service';

@Component({
  selector: 'app-inventaire',
  templateUrl: './inventaire.component.html',
  styleUrls: ['./inventaire.component.css']
})
export class InventaireComponent implements OnInit {
  interval: ReturnType<typeof setInterval> | undefined;
  inventaire: Inventaire = new Inventaire();
  inventaireRessource: InventaireRessource[] = [];
  inventaireEquipement: Equipement[] = [];

  constructor(private inventaireService: InventaireService) { }

  ngOnInit(): void {
    this.interval = setInterval(() => {
      this.inventaireRessource = this.inventaireService.getInventaireRessource();
      this.inventaireEquipement = this.inventaireService.getInventaireEquipement();
    }, 100);
  }

}
