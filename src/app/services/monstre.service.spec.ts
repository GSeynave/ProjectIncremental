import { TestBed } from '@angular/core/testing';
import { Monstre } from '../models/monstre';

import { MonstreService } from './monstre.service';

describe('MonstreService', () => {
  let service: MonstreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MonstreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return list of monstres', () => {
    let monstres: Monstre[] = [];
    service.getMonstresByZoneId(1).subscribe((data) => (monstres = data));
    expect(monstres.length).toBeGreaterThan(0);
  });
});
