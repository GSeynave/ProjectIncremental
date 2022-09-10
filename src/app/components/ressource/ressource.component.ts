import { Component, Input, OnInit } from '@angular/core';
import { Ressource } from 'src/app/models/ressource';

@Component({
  selector: 'app-ressource',
  templateUrl: './ressource.component.html',
  styleUrls: ['./ressource.component.css']
})
export class RessourceComponent implements OnInit {

  @Input('ressource') ressource: Ressource = new Ressource();
  constructor() { }

  ngOnInit(): void {
  }

  getRessourceIcone(): string{
    return "../../../assets/ressources/" +this.ressource.nom.replace( / +/g, '').replace('\'', '') + ".png";
  }
}
