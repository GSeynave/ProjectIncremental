import { Component, Input, OnInit } from '@angular/core';
import { Monstre } from 'src/app/models/monstre';
import { Ressource } from 'src/app/models/ressource';
import { RessourceService } from 'src/app/services/ressource.service';

@Component({
  selector: 'app-monstre',
  templateUrl: './monstre.component.html',
  styleUrls: ['./monstre.component.css'],
})
export class MonstreComponent implements OnInit {
  @Input('monstre') monstre: Monstre = new Monstre();

  ressources: Ressource[] = [];
  constructor(private ressourceService: RessourceService) {}

  ngOnInit(): void {
    this.ressources = this.ressourceService.getRessourcesByMonstreId(
      this.monstre.id
    );
  }
}
