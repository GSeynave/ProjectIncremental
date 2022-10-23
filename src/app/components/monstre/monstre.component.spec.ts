import { ComponentFixture, TestBed } from '@angular/core/testing';
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
    const spyRessourceService = spyOn(
      ressourceService,
      'getRessourcesByMonstreId'
    );
    component.ngOnInit();
    expect(spyRessourceService).toHaveBeenCalledTimes(1);
  });
});
