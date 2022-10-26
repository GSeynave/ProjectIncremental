import { TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { Equipement } from '../models/equipement';
import { Metier } from '../models/metier';
import { Recette } from '../models/recette';

import { MetierService } from './metier.service';

describe('MetierService', () => {
  let service: MetierService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MetierService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get metiers', () => {
    let metiers: Metier[] = [];
    service.getMetiers().subscribe((data) => (metiers = data));
    expect(metiers.length).toBeGreaterThan(0);
  });

  it('should get recette by metier id', () => {
    let recettes: Recette[] = [];
    service.getRecetteByMetierId(1).subscribe((data) => (recettes = data));
    expect(recettes.length).toBeGreaterThan(0);
  });

  it('should get equipement by recette id', () => {
    let equipement: Equipement = new Equipement();
    service
      .getEquipementByRecetteId(1)
      .subscribe((data) => (equipement = data));
    expect(equipement.id).toBe(22);
  });
});
