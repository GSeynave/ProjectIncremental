import { SimpleChange } from '@angular/core';
import {
  ComponentFixture,
  discardPeriodicTasks,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';
import { of } from 'rxjs';
import { Monstre } from 'src/app/models/monstre';
import { Personnage } from 'src/app/models/personnage';
import { Ressource } from 'src/app/models/ressource';
import { Statistique } from 'src/app/models/statistique';
import { FarmService } from 'src/app/services/farm.service';
import { InventaireService } from 'src/app/services/inventaire.service';
import { MonstreService } from 'src/app/services/monstre.service';
import { RessourceService } from 'src/app/services/ressource.service';
import { StatistiqueService } from 'src/app/services/statistique.service';

import { FarmComponent } from './farm.component';

describe('FarmComponent', () => {
  let component: FarmComponent;
  let fixture: ComponentFixture<FarmComponent>;
  let statistiqueService: StatistiqueService;
  let monstreService: MonstreService;
  let personnageStatistique: Statistique = new Statistique();
  let ressourceService: RessourceService = new RessourceService();
  let inventaireService: InventaireService = new InventaireService();
  let farmService: FarmService = new FarmService();
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FarmComponent],
    }).compileComponents();
    statistiqueService = TestBed.inject(StatistiqueService);
    monstreService = TestBed.inject(MonstreService);
    ressourceService = TestBed.inject(RessourceService);
    inventaireService = TestBed.inject(InventaireService);
    farmService = TestBed.inject(FarmService);
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
    spyOn(statistiqueService, 'getStatistiqueById').and.returnValue(
      of(personnageStatistique)
    );
    spyOn(statistiqueService, 'addStatistiques').and.returnValue(
      of(personnageStatistique)
    );
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
  });

  it('should get random monstre', () => {
    let monstres: Monstre[] = [];
    let monstre1: Monstre = generateMonstre(1, 'monstre1', 1, 1);
    let monstre2: Monstre = generateMonstre(2, 'monstre2', 2, 1);
    monstres.push(monstre1);
    monstres.push(monstre2);
    spyOn(monstreService, 'getMonstresByZoneId').and.returnValue(of(monstres));
    component.getMonstreRandom();
    expect(monstres.includes(component.monstreActuel)).toBeTrue;
  });

  it('should change zoneId on value change', () => {
    expect(component.zoneId).toBe(0);
    const spyInitFarm = spyOn(component, 'initFarm');
    component.ngOnChanges({
      zoneId: new SimpleChange(null, 2, true),
    });
    expect(component.zoneId).toEqual(2);
    expect(spyInitFarm).toHaveBeenCalled();
  });

  it('should change personnage on value change', () => {
    expect(component.personnage.id).toBe(0);
    let personnage: Personnage = new Personnage();
    personnage.id = 1;
    component.ngOnChanges({
      personnage: new SimpleChange(null, personnage, true),
    });
    expect(component.personnage.id).toEqual(1);
  });

  it('should get drop', () => {
    let ressources: Ressource[] = [];
    let ressource1: Ressource = generateRessource(
      1,
      'ressource1',
      100,
      1,
      1,
      1
    );
    let ressource2: Ressource = generateRessource(2, 'ressource2', 0, 1, 1, 1);
    ressources.push(ressource1);
    ressources.push(ressource2);
    spyOn(ressourceService, 'getRessourcesByMonstreId').and.returnValue(
      of(ressources)
    );
    let spyInventaireService = spyOn(inventaireService, 'addRessource');
    component.getDrop();
    expect(spyInventaireService).toHaveBeenCalledTimes(1);
  });

  it('should get percent vie', () => {
    component.vieMonstre = 6;
    component.statistiqueMonstre.vie = 6;
    expect(100).toEqual(
      component.getPercentVie(
        component.vieMonstre,
        component.statistiqueMonstre.vie
      )
    );
    component.vieMonstre = 3;
    expect(50).toEqual(
      component.getPercentVie(
        component.vieMonstre,
        component.statistiqueMonstre.vie
      )
    );
  });

  it('should call round interval tick each time interval tick', fakeAsync(() => {
    const spyRoundIntervalTick = spyOn(component, 'roundIntervalTick');
    component.farm();
    tick(3000);
    fixture.detectChanges();
    expect(spyRoundIntervalTick).toHaveBeenCalledTimes(3);
    discardPeriodicTasks();
  }));

  it('should attack monstre, attack personnage, endroundcheck', () => {
    const spyAttackMonstre = spyOn(component, 'attackToMonstre');
    const spyAttackPersonnage = spyOn(component, 'attackToPersonnage');
    const spyEndRoundCheck = spyOn(component, 'endRoundCheck');
    component.roundIntervalTick();
    expect(spyAttackMonstre).toHaveBeenCalledTimes(1);
    expect(spyAttackPersonnage).toHaveBeenCalledTimes(1);
    expect(spyEndRoundCheck).toHaveBeenCalledTimes(1);
  });

  it('should clear init on mort personnage', () => {
    const spyClearFarm = spyOn(component, 'clearFarm');
    component.viePersonnage = 1;
    component.endRoundCheck();
    expect(spyClearFarm).toHaveBeenCalledTimes(0);
    component.viePersonnage = -1;
    component.endRoundCheck();
    expect(spyClearFarm).toHaveBeenCalledTimes(1);
  });

  it('should get drop and new monstre on mort monstre', () => {
    const spyGetDrop = spyOn(component, 'getDrop');
    const spyGetMonstreRandom = spyOn(component, 'getMonstreRandom');
    component.vieMonstre = 1;
    component.endRoundCheck();
    expect(spyGetDrop).toHaveBeenCalledTimes(0);
    expect(spyGetMonstreRandom).toHaveBeenCalledTimes(0);
    component.vieMonstre = -1;
    component.endRoundCheck();
    expect(spyGetDrop).toHaveBeenCalledTimes(1);
    expect(spyGetMonstreRandom).toHaveBeenCalledTimes(1);
  });

  it('should update statistique', () => {
    const statPerso: Statistique = new Statistique();
    statPerso.vie = 20;
    const statEquip: Statistique = new Statistique();
    statEquip.vie = 10;
    component.statistiquePersonnage = statPerso;
    component.statistiqueEquipement = statEquip;
    expect(component.statistiquePersonnage.vie).toBe(20);
    expect(component.statistiqueEquipement.vie).toBe(10);
    statPerso.vie = 50;
    statEquip.vie = 25;
    spyOn(statistiqueService, 'getStatistiqueById').and.returnValue(
      of(statPerso)
    );
    spyOn(
      statistiqueService,
      'getEquipementStatistiqueByPersonnage'
    ).and.returnValue(of(statEquip));
    component.updateStatitistique();
    expect(component.statistiquePersonnage.vie).toBe(50);
    expect(component.statistiqueEquipement.vie).toBe(25);
  });

  it('should decrease monstre vie by personnage degat', () => {
    spyOn(farmService, 'getDegatInflige').and.returnValue(2);
    const spyUpdateLifeHtmlEntity = spyOn(component, 'updateLifeHtmlEntity');
    component.vieMonstre = 10;
    expect(component.vieMonstre).toBe(10);
    component.attackToMonstre();
    expect(component.vieMonstre).toBe(8);
    expect(spyUpdateLifeHtmlEntity).toHaveBeenCalledTimes(1);
  });

  let generateMonstre = (
    id: number,
    nom: string,
    idStatistique: number,
    idZone: number
  ) => {
    let monstre: Monstre = new Monstre();
    monstre.id = id;
    monstre.nom = nom;
    monstre.idStatistique = idStatistique;
    monstre.idZone = idZone;
    return monstre;
  };

  let generateRessource = (
    id: number,
    nom: string,
    tauxDrop: number,
    idZone: number,
    idMonstre: number,
    quantite: number
  ) => {
    let ressource: Ressource = new Ressource();
    ressource.id = id;
    ressource.nom = nom;
    ressource.tauxDrop = tauxDrop;
    ressource.idZone = idZone;
    ressource.idMonstre = idMonstre;
    ressource.quantite = quantite;
    return ressource;
  };
});
