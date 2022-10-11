import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FarmComponent } from './farm.component';

describe('LifebarComponent', () => {
  let component: FarmComponent;
  let fixture: ComponentFixture<FarmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FarmComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FarmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should clear interval and start new farm on teleport id changes'), () => {
  }

  it('should not init farm if zoneTeleport id is 0'), () => {
  }

  it('should change farm zone if zoneTeleport id changes and is not 0'), () => {
  }

  it('should change personnage caracteristique if personnage changs'), () => {
  }

  it('should get a random monster on getMonstreRandom()'), () => {
  }

  it('should change html vieMonstre'), () => {
  }

  it('should call getDrop & getMonstreRandom on vieMonstre <= 0'), () => {
  }

  it('should instanciate new Monstre && new Statistique && interval on clearFarm()'), () => {
  }
});
