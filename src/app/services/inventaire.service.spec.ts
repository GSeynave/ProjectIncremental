import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { Equipement } from '../models/equipement';
import { Ressource } from '../models/ressource';

import { InventaireService } from './inventaire.service';

describe('InventaireRessourceService', () => {
  let service: InventaireService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InventaireService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add ressource in inventaire', () => {
    let ressource: Ressource = new Ressource();
    expect(service.inventaireRessources.includes(ressource)).toBe(false);
    service.addRessource(ressource);
    expect(service.inventaireRessources.includes(ressource)).toBe(true);
  });

  it('should remove ressource from inventaire', () => {
    let ressource: Ressource = new Ressource();
    service.inventaireRessources.push(ressource);
    expect(service.inventaireRessources.includes(ressource)).toBe(true);
    service.removeRessource(ressource);
    expect(service.inventaireRessources.includes(ressource)).toBe(false);
  });

  it('should return ressource quantite', () => {
    let ressource: Ressource = new Ressource();
    let quantite: number = 0;
    service.getQuantite(ressource).subscribe((data) => (quantite = data));
    expect(quantite).toEqual(0);
    ressource.quantite = 13;
    service.inventaireRessources.push(ressource);
    service.getQuantite(ressource).subscribe((data) => (quantite = data));
    expect(quantite).toEqual(ressource.quantite);
  });

  it('should get equipement by personnage id', () => {
    let equipement: Equipement = new Equipement();
    service.inventaireEquipements.push(equipement);
    service.getEquipementsByPersonnageId(1).subscribe((data) => {
      expect(data.length).toEqual(1);
    });
  });

  it('should get inventaire equipement', () => {
    service.getInventaireEquipement().subscribe((data) => {
      expect(data).toEqual(service.inventaireEquipements);
    });
  });

  it('should update inventaire equipement', () => {
    let equipement: Equipement = new Equipement();
    expect(service.inventaireEquipements.includes(equipement)).toBe(false);
    service.updateInventaireEquipement(equipement);
    expect(service.inventaireEquipements.includes(equipement)).toBe(true);
  });
});
