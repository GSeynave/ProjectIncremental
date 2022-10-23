import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { Personnage } from 'src/app/models/personnage';
import { Zone } from 'src/app/models/zone';
import { PersonnageService } from 'src/app/services/personnage.service';

@Component({
  selector: 'app-personnage-farm',
  templateUrl: './personnage-farm.component.html',
  styleUrls: ['./personnage-farm.component.css'],
})
export class PersonnageFarmComponent implements OnInit {
  personnage: Personnage = new Personnage();
  zoneId: number = 0;
  interval: ReturnType<typeof setInterval> | undefined;

  constructor(private personnageService: PersonnageService) {}

  ngOnInit(): void {
    this.personnage = this.personnageService.getPersonnageById(1);
    if (this.personnage.zoneId != 0) {
      this.zoneId = this.personnage.zoneId;
    }

    this.interval = setInterval(() => {
      let zoneTemp: number = this.personnageService.getPersonnageById(1).zoneId;
      if (this.zoneId !== zoneTemp) {
        this.zoneId = zoneTemp;
      }
    }, 1000);
  }
}
