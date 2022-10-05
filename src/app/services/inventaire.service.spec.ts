import { TestBed } from '@angular/core/testing';

import { InventaireService } from './inventaire.service';

describe('InventaireRessourceService', () => {
  let service: InventaireService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InventaireService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
