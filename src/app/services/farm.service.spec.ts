import { TestBed } from '@angular/core/testing';
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

  it('should get degat total', () => {
    let personnageStatistique: Statistique = new Statistique();
    let monstreStatistique: Statistique = new Statistique();
    let spyService = spyOn(service, 'getDegat').and.returnValue(2);
    expect(
      service.getDegatInflige(personnageStatistique, monstreStatistique)
    ).toBe(0.8);
    expect(spyService).toHaveBeenCalledTimes(4);
  });

  it('should return degat', () => {
    expect(service.getDegat(20, 10)).toEqual(1.8);
  });
});
