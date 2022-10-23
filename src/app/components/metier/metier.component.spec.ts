import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Metier } from 'src/app/models/metier';
import { MetierService } from 'src/app/services/metier.service';

import { MetierComponent } from './metier.component';

describe('MetierComponent', () => {
  let component: MetierComponent;
  let fixture: ComponentFixture<MetierComponent>;
  let metierService = new MetierService();
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MetierComponent],
    }).compileComponents();
    metierService = TestBed.inject(MetierService);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MetierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get metiers list on init', () => {
    let metiers: Metier[] = [];
    const spyMetierService = spyOn(metierService, 'getMetiers').and.returnValue(
      metiers
    );
    component.ngOnInit();
    expect(spyMetierService).toHaveBeenCalled();
  });
});
