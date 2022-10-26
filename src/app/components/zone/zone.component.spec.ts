import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Zone } from 'src/app/models/zone';
import { PersonnageService } from 'src/app/services/personnage.service';

import { ZoneComponent } from './zone.component';

describe('ZoneComponent', () => {
  let component: ZoneComponent;
  let fixture: ComponentFixture<ZoneComponent>;
  let personnageService = new PersonnageService();
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ZoneComponent],
    }).compileComponents();
    personnageService = TestBed.inject(PersonnageService);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ZoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get set zone', () => {
    let zone: Zone = new Zone();
    zone.id = 1;
    let spyPersonnageService = spyOn(personnageService, 'setZoneId');
    component.utiliserPortail(zone);
    expect(spyPersonnageService).toHaveBeenCalledOnceWith(1);
  });
});
