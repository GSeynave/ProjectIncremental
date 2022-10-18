import { SimpleChange } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Monstre } from 'src/app/models/monstre';
import { Personnage } from 'src/app/models/personnage';
import { Ressource } from 'src/app/models/ressource';
import { Statistique } from 'src/app/models/statistique';
import { InventaireService } from 'src/app/services/inventaire.service';
import { MonstreService } from 'src/app/services/monstre.service';
import { RessourceService } from 'src/app/services/ressource.service';
import { StatistiqueService } from 'src/app/services/statistique.service';

import { FarmComponent } from './farm.component';

describe('LifebarComponent', () => {
  let component: FarmComponent;
  let fixture: ComponentFixture<FarmComponent>;
  let statistiqueService: StatistiqueService;
  let monstreService: MonstreService;
  let personnageStatistique: Statistique = new Statistique();
  let ressourceService: RessourceService = new RessourceService();
  let inventaireService: InventaireService = new InventaireService();

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FarmComponent ]
    })
    .compileComponents();
    statistiqueService = TestBed.inject(StatistiqueService);
    monstreService = TestBed.inject(MonstreService);
    ressourceService = TestBed.inject(RessourceService);
    inventaireService = TestBed.inject(InventaireService);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FarmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get personnage statistique', () => {
    personnageStatistique.vie = 5555;
    spyOn(statistiqueService, 'getStatistiqueById').and.returnValue(personnageStatistique);
    const spyInitFarm = spyOn(component, 'initFarm');
    component.ngOnInit();
    expect(component.statistiquePersonnage.vie).toEqual(5555);
    expect(component.viePersonnage).toEqual(5555);
    expect(spyInitFarm).toHaveBeenCalled();
  });

  it('should not start farm', () => {
    component.zoneId = 0;
    const spyClearFarm = spyOn(component, 'clearFarm');
    const spyFarm = spyOn(component, 'farm');
    component.initFarm();

    expect(spyClearFarm).toHaveBeenCalledTimes(0);
    expect(spyFarm).toHaveBeenCalledTimes(0);
  });

  it('should prepare and begin farm', () => {
    component.zoneId = 1;
    const spyClearFarm = spyOn(component, 'clearFarm');
    const spyFarm = spyOn(component, 'farm');
    component.initFarm();
    expect(spyClearFarm).toHaveBeenCalled();
    expect(spyFarm).toHaveBeenCalled();
  });

  it('should set new monstre and monstre statistique', () => {
    component.monstreActuel.nom = 'test';
    component.statistiqueMonstre.vie = 222;
    expect(component.monstreActuel.nom).toEqual('test');
    expect(component.statistiqueMonstre.vie).toEqual(222);
    component.clearFarm();
    expect(component.monstreActuel.nom).toEqual('');
    expect(component.statistiqueMonstre.vie).toEqual(0);
  })

  it('should get random monstre', () => {
    let monstres: Monstre[] = [];
    let monstre1: Monstre = generateMonstre(1, 'monstre1', 1, 1);
    let monstre2: Monstre = generateMonstre(2, 'monstre2', 2, 1);
    monstres.push(monstre1);
    monstres.push(monstre2);
    spyOn(monstreService, 'getMonstresByZoneId').and.returnValue(monstres);
    component.getMonstreRandom();
    expect(monstres.includes(component.monstreActuel)).toBeTrue;
  })

  it('should change zoneId on value change', () => {
    expect(component.zoneId).toBe(0);
    const spyInitFarm = spyOn(component,'initFarm');
    component.ngOnChanges({
      zoneId: new SimpleChange(null, 2, true)
    });
    expect(component.zoneId).toEqual(2);
    expect(spyInitFarm).toHaveBeenCalled();
  });

  it('should change personnageon value change', () => {
    expect(component.personnage.id).toBe(0);
    let personnage: Personnage = new Personnage();
    personnage.id = 1;
    component.ngOnChanges({
      personnage: new SimpleChange(null, personnage, true)
    });
    expect(component.personnage.id).toEqual(1);
  });

  fit('should get drop', () => {
    let ressources: Ressource[] = [];
    let ressource1: Ressource = generateRessource(1, 'ressource1', 100, 1, 1, 1);
    let ressource2: Ressource = generateRessource(2, 'ressource2', 0, 1, 1, 1);
    ressources.push(ressource1);
    ressources.push(ressource2);
    spyOn(ressourceService, 'getRessourcesByMonstreId').and.returnValue(ressources);
    let spyInventaireService = spyOn(inventaireService, 'addRessource');
    component.getDrop();
    expect(spyInventaireService).toHaveBeenCalledTimes(1);
  })

  let generateMonstre = (id: number, nom: string, idStatistique: number, idZone: number) =>  {
   let monstre: Monstre = new Monstre();
   monstre.id = id;
   monstre.nom = nom;
   monstre.idStatistique = idStatistique;
   monstre.idZone = idZone;
    return monstre;
  }

  let generateRessource = (id: number, nom: string, tauxDrop: number, idZone: number, idMonstre: number, quantite: number) => {
    let ressource: Ressource = new Ressource();
    ressource.id = id;
    ressource.nom = nom;
    ressource.tauxDrop = tauxDrop;
    ressource.idZone = idZone;
    ressource.idMonstre = idMonstre;
    ressource.quantite = quantite;
    return ressource;
  }
});
