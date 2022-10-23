import {
  ComponentFixture,
  discardPeriodicTasks,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';
import { Equipement } from 'src/app/models/equipement';
import { Ressource } from 'src/app/models/ressource';
import { InventaireService } from 'src/app/services/inventaire.service';

import { InventaireComponent } from './inventaire.component';

describe('InventaireComponent', () => {
  let component: InventaireComponent;
  let fixture: ComponentFixture<InventaireComponent>;
  let inventaireService: InventaireService;
  let ressources: Ressource[] = [];
  let ressource: Ressource = new Ressource();
  let equipements: Equipement[] = [];
  let equipement: Equipement = new Equipement();

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InventaireComponent],
    }).compileComponents();
    inventaireService = TestBed.inject(InventaireService);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InventaireComponent);
    component = fixture.componentInstance;
    // fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get interval ticking', fakeAsync(() => {
    expect(component.inventaireRessource.length).toEqual(0);
    ressources.push(ressource);
    equipements.push(equipement);
    let spyRessource = spyOn(
      inventaireService,
      'getInventaireRessource'
    ).and.returnValue(ressources);
    let spyEquipement = spyOn(
      inventaireService,
      'getInventaireEquipement'
    ).and.returnValue(equipements);
    fixture.detectChanges();
    tick(1000);
    expect(component.inventaireRessource.length).toEqual(1);
    expect(component.inventaireEquipement.length).toEqual(1);
    tick(1000);
    expect(spyRessource).toHaveBeenCalledTimes(20);
    expect(spyEquipement).toHaveBeenCalledTimes(20);
    discardPeriodicTasks();
  }));
});
