import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { Monstre } from 'src/app/models/monstre';
import { Ressource } from 'src/app/models/ressource';
import { RessourceService } from 'src/app/services/ressource.service';

import { MonstreComponent } from './monstre.component';

describe('MonstreComponent', () => {
  let component: MonstreComponent;
  let fixture: ComponentFixture<MonstreComponent>;
  let ressourceService = new RessourceService();
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MonstreComponent],
    }).compileComponents();
    ressourceService = TestBed.inject(RessourceService);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MonstreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get ressources on init', () => {
    let ressources: Ressource[] = [];
    const spyRessourceService = spyOn(
      ressourceService,
      'getRessourcesByMonstreId'
    ).and.returnValue(of(ressources));
    component.ngOnInit();
    expect(spyRessourceService).toHaveBeenCalledTimes(1);
  });
});
