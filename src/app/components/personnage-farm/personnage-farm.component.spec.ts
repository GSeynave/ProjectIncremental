import {
  ComponentFixture,
  discardPeriodicTasks,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';
import { Personnage } from 'src/app/models/personnage';
import { PersonnageService } from 'src/app/services/personnage.service';

import { PersonnageFarmComponent } from './personnage-farm.component';

describe('PersonnageFarmComponent', () => {
  let component: PersonnageFarmComponent;
  let fixture: ComponentFixture<PersonnageFarmComponent>;
  let personnageService = new PersonnageService();
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PersonnageFarmComponent],
    }).compileComponents();
    personnageService = TestBed.inject(PersonnageService);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonnageFarmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get personnage on init et set zone id', () => {
    let personnage: Personnage = new Personnage();
    personnage.zoneId = 5;
    const spyPersonnageService = spyOn(
      personnageService,
      'getPersonnageById'
    ).and.returnValue(personnage);
    component.ngOnInit();
    expect(spyPersonnageService).toHaveBeenCalledTimes(1);
    expect(component.zoneId).toEqual(5);
  });

  it('should get zone id after new interval tick', fakeAsync(() => {
    let personnage: Personnage = new Personnage();
    personnage.zoneId = 5;
    const spyPersonnageService = spyOn(
      personnageService,
      'getPersonnageById'
    ).and.returnValue(personnage);
    component.ngOnInit();
    expect(component.zoneId).toEqual(5);
    expect(spyPersonnageService).toHaveBeenCalledTimes(1);
    personnage.zoneId = 8;
    tick(1000);
    expect(personnage.zoneId).toEqual(8);
    expect(spyPersonnageService).toHaveBeenCalledTimes(2);
    tick(1000);
    expect(personnage.zoneId).toEqual(8);
    discardPeriodicTasks();
  }));
});
