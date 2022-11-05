import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { Statistique } from '../models/statistique';

import { FarmService } from './farm.service';

describe('FarmService', () => {
  let service: FarmService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FarmService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  fit('should get degat total', async () => {
    let personnageStatistique: Statistique = new Statistique();
    let monstreStatistique: Statistique = new Statistique();
    let spyService = spyOn(service, 'getDegat').and.returnValue(2);
    const degatInflige: number = await service.getDegatInflige(
      personnageStatistique,
      monstreStatistique
    );
    expect(degatInflige).toBe(0.8);
    expect(spyService).toHaveBeenCalledTimes(4);
  });

  it('should return degat', () => {
    expect(service.getDegat(20, 10)).toEqual(1.8);
  });
});
