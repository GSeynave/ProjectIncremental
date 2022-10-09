import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonnageFarmComponent } from './personnage-farm.component';

describe('PersonnageFarmComponent', () => {
  let component: PersonnageFarmComponent;
  let fixture: ComponentFixture<PersonnageFarmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PersonnageFarmComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonnageFarmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});