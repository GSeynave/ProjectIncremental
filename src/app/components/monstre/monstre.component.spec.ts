import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonstreComponent } from './monstre.component';

describe('MonstreComponent', () => {
  let component: MonstreComponent;
  let fixture: ComponentFixture<MonstreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MonstreComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MonstreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
