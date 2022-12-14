import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { Zone } from 'src/app/models/zone';
import { ZoneService } from 'src/app/services/zone.service';

import { PortailComponent } from './portail.component';

describe('PortailComponent', () => {
  let component: PortailComponent;
  let fixture: ComponentFixture<PortailComponent>;
  let zoneService = new ZoneService();
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PortailComponent],
    }).compileComponents();
    zoneService = TestBed.inject(ZoneService);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PortailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get zone on init', () => {
    let zones: Zone[] = [];
    let spyZoneService = spyOn(zoneService, 'getZones').and.returnValue(
      of(zones)
    );
    component.ngOnInit();
    expect(spyZoneService).toHaveBeenCalledTimes(1);
  });
});
