import { TestBed } from '@angular/core/testing';

import { InventaireRessourceService } from './inventaire-ressource.service';

describe('InventaireRessourceService', () => {
  let service: InventaireRessourceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InventaireRessourceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
