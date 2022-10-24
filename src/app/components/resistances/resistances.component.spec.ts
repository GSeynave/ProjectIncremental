import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { Statistique } from 'src/app/models/statistique';
import { InventaireService } from 'src/app/services/inventaire.service';
import { StatistiqueService } from 'src/app/services/statistique.service';

import { ResistancesComponent } from './resistances.component';

describe('ResistancesComponent', () => {
  let component: ResistancesComponent;
  let fixture: ComponentFixture<ResistancesComponent>;
  let inventaireService = new InventaireService();
  let statistiqueService = new StatistiqueService(inventaireService);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ResistancesComponent],
    }).compileComponents();
    statistiqueService = TestBed.inject(StatistiqueService);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResistancesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get statistique on init', () => {
    let statistique: Statistique = new Statistique();
    let spyStatistiqueService = spyOn(
      statistiqueService,
      'getStatistiqueById'
    ).and.returnValue(of(statistique));
    component.ngOnInit();
    expect(spyStatistiqueService).toHaveBeenCalledTimes(1);
  });
});
