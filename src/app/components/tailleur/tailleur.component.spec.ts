import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TailleurComponent } from './tailleur.component';

describe('TailleurComponent', () => {
  let component: TailleurComponent;
  let fixture: ComponentFixture<TailleurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TailleurComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TailleurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
