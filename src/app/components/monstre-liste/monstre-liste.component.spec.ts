import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonstreListeComponent } from './monstre-liste.component';

describe('MonstreListeComponent', () => {
  let component: MonstreListeComponent;
  let fixture: ComponentFixture<MonstreListeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MonstreListeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MonstreListeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
