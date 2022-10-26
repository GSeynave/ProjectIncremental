import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { Monstre } from 'src/app/models/monstre';
import { MonstreService } from 'src/app/services/monstre.service';

import { MonstreListeComponent } from './monstre-liste.component';

describe('MonstreListeComponent', () => {
  let component: MonstreListeComponent;
  let fixture: ComponentFixture<MonstreListeComponent>;
  let monstreService = new MonstreService();
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MonstreListeComponent],
    }).compileComponents();
    monstreService = TestBed.inject(MonstreService);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MonstreListeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get monstres liste on ngOnInit', () => {
    let monstres: Monstre[] = [];
    const spyMonstreService = spyOn(
      monstreService,
      'getMonstresByZoneId'
    ).and.returnValue(of(monstres));
    component.ngOnInit();
    expect(spyMonstreService).toHaveBeenCalledTimes(1);
  });
});
