import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Zone } from 'src/app/models/zone';

import { HomeComponent } from './home.component';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update portail id', () => {
    expect(component.zoneTeleport.id).toBe(0);
    let zone: Zone = new Zone();
    zone.id = 1;
    zone.nom = 'Test';
    component.utiliserPortail(zone);
    expect(component.zoneTeleport).toEqual(zone);
  });
});
