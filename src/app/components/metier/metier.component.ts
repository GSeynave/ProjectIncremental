import { Component, OnInit } from '@angular/core';
import { Metier } from 'src/app/models/metier';
import { MetierService } from 'src/app/services/metier.service';

@Component({
  selector: 'app-metier',
  templateUrl: './metier.component.html',
  styleUrls: ['./metier.component.css']
})
export class MetierComponent implements OnInit {

  metiers: Metier[] = [];

  constructor(private metierService: MetierService) { }

  ngOnInit(): void {
    this.metiers = this.metierService.getMetiers();
  }

}
