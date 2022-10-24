import { Component, Input, OnInit } from '@angular/core';
import { Statistique } from 'src/app/models/statistique';
import { StatistiqueService } from 'src/app/services/statistique.service';

@Component({
  selector: 'app-resistances',
  templateUrl: './resistances.component.html',
  styleUrls: ['./resistances.component.css'],
})
export class ResistancesComponent implements OnInit {
  @Input('idStatistique') idStatistique: number = 0;
  statistique: Statistique = new Statistique();
  constructor(private statistiqueService: StatistiqueService) {}

  ngOnInit(): void {
    this.statistiqueService
      .getStatistiqueById(this.idStatistique)
      .subscribe((data) => (this.statistique = data));
  }
}
