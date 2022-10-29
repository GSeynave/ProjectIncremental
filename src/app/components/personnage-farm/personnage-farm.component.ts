import { Component, OnInit } from '@angular/core';
import { Personnage } from 'src/app/models/personnage';
import { Zone } from 'src/app/models/zone';
import { PersonnageService } from 'src/app/services/personnage.service';
import { ZoneService } from 'src/app/services/zone.service';

@Component({
  selector: 'app-personnage-farm',
  templateUrl: './personnage-farm.component.html',
  styleUrls: ['./personnage-farm.component.css'],
})
export class PersonnageFarmComponent implements OnInit {
  personnage: Personnage = new Personnage();
  zoneId: number = 0;
  zone: Zone = new Zone();
  interval: ReturnType<typeof setInterval> | undefined;

  constructor(
    private personnageService: PersonnageService,
    private zoneService: ZoneService
  ) {}

  ngOnInit(): void {
    this.personnage = this.personnageService.getPersonnageById(1);
    if (this.personnage.zoneId != 0) {
      this.zoneId = this.personnage.zoneId;
      this.zoneService.getZoneById(this.zoneId).subscribe((data) => {
        this.zone = data;
      });
    }

    this.interval = setInterval(() => {
      this.personnage = this.personnageService.getPersonnageById(1);
      console.log('interval personnage:', this.personnage);
      if (this.zoneId !== this.personnage.zoneId) {
        this.zoneId = this.personnage.zoneId;
      }
    }, 1000);
  }
}
