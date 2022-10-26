import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { Equipement } from 'src/app/models/equipement';
import { Recette } from 'src/app/models/recette';
import { Ressource } from 'src/app/models/ressource';
import { InventaireService } from 'src/app/services/inventaire.service';
import { MetierService } from 'src/app/services/metier.service';

import { TailleurComponent } from './tailleur.component';

describe('TailleurComponent', () => {
  let component: TailleurComponent;
  let fixture: ComponentFixture<TailleurComponent>;
  let metierService = new MetierService();
  let inventaireService = new InventaireService();
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TailleurComponent],
    }).compileComponents();
    metierService = TestBed.inject(MetierService);
    inventaireService = TestBed.inject(InventaireService);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TailleurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get recette on init', () => {
    let recettes: Recette[] = [];
    let spyMetierService = spyOn(
      metierService,
      'getRecetteByMetierId'
    ).and.returnValue(of(recettes));
    component.ngOnInit();
    expect(spyMetierService).toHaveBeenCalledTimes(1);
  });

  it(' should get equipement by recette id', () => {
    let recetteId = 1;
    let equipement: Equipement = new Equipement();
    equipement.nom = 'Equipement de Test';
    equipement.recipeId = recetteId;
    let spyMetierService = spyOn(
      metierService,
      'getEquipementByRecetteId'
    ).and.returnValue(of(equipement));
    expect(component.getEquipementByRecetteId(recetteId)).toEqual(
      equipement.nom
    );
    expect(spyMetierService).toHaveBeenCalledTimes(1);
  });

  it('should get quantite of ressource in inventaire', () => {
    let ressource: Ressource = new Ressource();
    ressource.quantite = 5;
    let spyInventaireService = spyOn(
      inventaireService,
      'getQuantite'
    ).and.returnValue(of(ressource.quantite));
    component.getQuantiteInInventaire(ressource);
    expect(spyInventaireService).toHaveBeenCalledTimes(1);
    expect(component.getQuantiteInInventaire(ressource)).toEqual(
      ressource.quantite
    );
  });

  it('should craft equipement and remove ressource', () => {
    let ressource: Ressource = new Ressource();
    ressource.quantite = 2;
    let recette: Recette = new Recette();
    recette.id = 1;
    recette.ressources.push(ressource);
    let spyGetQuantiteInInventaire = spyOn(
      component,
      'getQuantiteInInventaire'
    ).and.returnValue(5);
    let equipement: Equipement = new Equipement();
    let spyMetierService = spyOn(
      metierService,
      'getEquipementByRecetteId'
    ).and.returnValue(of(equipement));
    let spyInventaireserviceInventaireEquipement = spyOn(
      inventaireService,
      'updateInventaireEquipement'
    );
    let spyInventaireServiceRemoveRessource = spyOn(
      inventaireService,
      'removeRessource'
    );
    component.craft(recette);
    expect(spyGetQuantiteInInventaire).toHaveBeenCalledWith(ressource);
    expect(spyMetierService).toHaveBeenCalledWith(recette.id);
    expect(spyInventaireserviceInventaireEquipement).toHaveBeenCalledWith(
      equipement
    );
    expect(spyInventaireServiceRemoveRessource).toHaveBeenCalledWith(ressource);
  });

  it('should not craft', () => {
    let ressource: Ressource = new Ressource();
    ressource.quantite = 2;
    let recette: Recette = new Recette();
    recette.id = 1;
    recette.ressources.push(ressource);
    let spyGetQuantiteInInventaire = spyOn(
      component,
      'getQuantiteInInventaire'
    ).and.returnValue(1);
    let spyConsole = spyOn(console, 'log');
    component.craft(recette);
    expect(spyGetQuantiteInInventaire).toHaveBeenCalled();
    expect(spyConsole).toHaveBeenCalledWith('ressource insuffisante');
  });

  it('should return false if not enough or true if enough ressources', () => {
    let quantiteInventaire: number = 2;
    const spyGetQuantiteInInventaire = spyOn(
      component,
      'getQuantiteInInventaire'
    ).and.returnValue(quantiteInventaire);
    let recette: Recette = new Recette();
    let ressource: Ressource = new Ressource();
    ressource.quantite = 5;
    recette.ressources.push(ressource);
    expect(component.checkRessourcesQuantite(recette)).toEqual(false);
    expect(spyGetQuantiteInInventaire).toHaveBeenCalledTimes(1);
    quantiteInventaire = 10;
    spyGetQuantiteInInventaire.and.returnValue(quantiteInventaire);
    expect(component.checkRessourcesQuantite(recette)).toEqual(true);
    expect(spyGetQuantiteInInventaire).toHaveBeenCalledTimes(2);
  });

  it('should remove ressource from inventaire', () => {
    let recette: Recette = new Recette();
    let ressource1: Ressource = new Ressource();
    ressource1.quantite = 2;
    let ressource2: Ressource = new Ressource();
    ressource2.quantite = 4;
    recette.ressources.push(ressource1);
    recette.ressources.push(ressource2);
    let spyInventaireService = spyOn(inventaireService, 'removeRessource');
    component.removeRessourceFromEquipement(recette);
    expect(spyInventaireService).toHaveBeenCalledWith(recette.ressources[0]);
    expect(spyInventaireService).toHaveBeenCalledWith(recette.ressources[1]);
  });

  it('should craft equipement', () => {
    let recette: Recette = new Recette();
    let equipement: Equipement = new Equipement();
    let spyMetierService = spyOn(
      metierService,
      'getEquipementByRecetteId'
    ).and.returnValue(of(equipement));
    let spyInventaireService = spyOn(
      inventaireService,
      'updateInventaireEquipement'
    );
    let spyRemoveRessourceFromEquipement = spyOn(
      component,
      'removeRessourceFromEquipement'
    );
    component.craftEquipement(recette);
    expect(spyMetierService).toHaveBeenCalledWith(recette.id);
    expect(spyInventaireService).toHaveBeenCalledTimes(1);
    expect(spyRemoveRessourceFromEquipement).toHaveBeenCalledWith(recette);
  });
});
