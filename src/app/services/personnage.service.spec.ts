import { TestBed } from '@angular/core/testing';
import { InventaireService } from './inventaire.service';

import { PersonnageService } from './personnage.service';
import { StatistiqueService } from './statistique.service';

describe('PersonnageService', () => {
  let service: PersonnageService;
  let statistiqueService: StatistiqueService;
  let inventaireService: InventaireService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PersonnageService);
    statistiqueService = TestBed.inject(StatistiqueService);
    inventaireService = TestBed.inject(InventaireService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
