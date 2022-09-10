import { TestBed } from '@angular/core/testing';

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
});
