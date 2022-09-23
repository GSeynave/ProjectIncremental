import { Component, OnInit } from '@angular/core';
import { interval } from 'rxjs';
import { Inventaire } from 'src/app/models/inventaire';
import { InventaireRessource } from 'src/app/models/inventaire-ressource';
import { InventaireRessourceService } from 'src/app/services/inventaire-ressource.service';

@Component({
  selector: 'app-inventaire',
  templateUrl: './inventaire.component.html',
  styleUrls: ['./inventaire.component.css']
})
export class InventaireComponent implements OnInit {
  interval: ReturnType<typeof setInterval> | undefined;
  inventaire: Inventaire = new Inventaire();
  inventaireRessource: InventaireRessource[] = [];

  constructor(private inventaireRessourceService: InventaireRessourceService) { }

  ngOnInit(): void {
    this.interval = setInterval(() => {
    this.inventaireRessource = this.inventaireRessourceService.getInventaireRessource();
    }, 100);
  }

}
