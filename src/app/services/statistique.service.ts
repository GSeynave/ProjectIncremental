import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of, throwError } from 'rxjs';
import { Equipement } from '../models/equipement';
import { Statistique } from '../models/statistique';
import { InventaireService } from './inventaire.service';

@Injectable({
  providedIn: 'root',
})
export class StatistiqueService {
  url: string = 'http://localhost:3000/api/statistiques';
  constructor(
    private inventaireService: InventaireService,
    private http: HttpClient
  ) {}

  getStatistiqueById(id: number): Observable<Statistique> {
    console.log('id to get perso stat', id);
    console.log(this.http.get<Statistique>(this.url + `/${id}`));
    return this.http
      .get<Statistique>(this.url + `/${id}`)
      .pipe(catchError(this.handleError));
  }

  getEquipementStatistiqueByPersonnage(
    personnageId: number
  ): Observable<Statistique> {
    console.log('get equipement stat by perso id');
    let equipements: Equipement[] = [];
    this.inventaireService
      .getEquipementsByPersonnageId(personnageId)
      .subscribe((data) => (equipements = data));
    let statistiqueEquipement: Statistique = new Statistique();
    if (equipements.length > 0) {
      this.getStatiqueByEquipement(equipements).subscribe(
        (data) => (statistiqueEquipement = data)
      );
    }
    return of(statistiqueEquipement);
  }

  private getStatiqueByEquipement(
    equipements: Equipement[]
  ): Observable<Statistique> {
    console.log('get statisique by equipement');
    let statTotal: Statistique = new Statistique();
    equipements.forEach((equipement) => {
      let statTemp: Statistique = new Statistique();
      this.getStatistiqueById(equipement.id).subscribe(
        (data) => (statTemp = data)
      );
      let statistiqueMultiple: Statistique = new Statistique();
      this.getmultipleStatistiqueByEquipementQuantite(
        statTemp,
        equipement.quantite
      ).subscribe((data) => (statistiqueMultiple = data));
      this.addStatistiques(statTotal, statistiqueMultiple);
    });

    return of(statTotal);
  }

  getmultipleStatistiqueByEquipementQuantite(
    stat: Statistique,
    quantite: number
  ): Observable<Statistique> {
    let statTotal: Statistique = new Statistique();
    statTotal.vie = stat.vie * quantite;
    statTotal.energie = stat.energie * quantite;
    statTotal.feu = stat.feu * quantite;
    statTotal.air = stat.air * quantite;
    statTotal.eau = stat.eau * quantite;
    statTotal.terre = stat.terre * quantite;
    statTotal.sagesse = stat.sagesse * quantite;
    statTotal.puissance = stat.puissance * quantite;
    statTotal.hate = stat.hate * quantite;
    statTotal.dexterite = stat.dexterite * quantite;
    statTotal.precision = stat.precision * quantite;
    statTotal.critiqueChance = stat.critiqueChance * quantite;
    statTotal.critiqueDommage = stat.critiqueDommage * quantite;
    statTotal.resistanceAir = stat.resistanceAir * quantite;
    statTotal.resistanceEau = stat.resistanceEau * quantite;
    statTotal.resistanceFeu = stat.resistanceFeu * quantite;
    statTotal.resistanceTerre = stat.terre * quantite;

    return of(statTotal);
  }

  addStatistiques(stat1: Statistique, stat2: Statistique): Statistique {
    let statTotal: Statistique = new Statistique();
    statTotal.vie = stat1.vie + stat2.vie;
    statTotal.energie = stat1.energie + stat2.energie;
    statTotal.feu = stat1.feu + stat2.feu;
    statTotal.air = stat1.air + stat2.air;
    statTotal.eau = stat1.eau + stat2.eau;
    statTotal.terre = stat1.terre + stat2.terre;
    statTotal.sagesse = stat1.sagesse + stat2.sagesse;
    statTotal.puissance = stat1.puissance + stat2.puissance;
    statTotal.hate = stat1.hate + stat2.hate;
    statTotal.dexterite = stat1.dexterite + stat2.dexterite;
    statTotal.precision = stat1.precision + stat2.precision;
    statTotal.critiqueChance = stat1.critiqueChance + stat2.critiqueChance;
    statTotal.critiqueDommage = stat1.critiqueDommage + stat2.critiqueDommage;
    statTotal.resistanceAir = stat1.resistanceAir + stat2.resistanceAir;
    statTotal.resistanceEau = stat1.resistanceEau + stat2.resistanceEau;
    statTotal.resistanceFeu = stat1.resistanceFeu + stat2.resistanceFeu;
    statTotal.resistanceTerre = stat1.resistanceTerre + stat2.resistanceTerre;

    return statTotal;
  }

  getRandomStatistique(max: number) {
    return Math.floor(Math.random() * max);
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      console.log('An error occured:', error.error);
    } else {
      console.error(
        `Backend returned code ${error.status}, body was: `,
        error.error
      );
    }

    return throwError(
      () => new Error('Something bad happened; please try again later.')
    );
  }
}
