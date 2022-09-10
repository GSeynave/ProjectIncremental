import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZaapComponent } from './zaap.component';

describe('ZaapComponent', () => {
  let component: ZaapComponent;
  let fixture: ComponentFixture<ZaapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ZaapComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ZaapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
