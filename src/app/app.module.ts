import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PersonnageFarmComponent } from './components/personnage-farm/personnage-farm.component';
import { FarmComponent } from './components/farm/farm.component';
import { ZaapComponent } from './components/zaap/zaap.component';
import { ZoneComponent } from './components/zone/zone.component';
import { MatButtonModule } from '@angular/material/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MonstreListeComponent } from './components/monstre-liste/monstre-liste.component';
import { MonstreComponent } from './components/monstre/monstre.component'
import { MatCardModule } from '@angular/material/card';
import { RessourceComponent } from './components/ressource/ressource.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ResistancesComponent } from './components/resistances/resistances.component';
import { HomeComponent } from './components/home/home.component';
import { InventaireComponent } from './components/inventaire/inventaire.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatExpansionModule } from '@angular/material/expansion';
import { MetierComponent } from './components/metier/metier.component';
import { TailleurComponent } from './components/tailleur/tailleur.component';

@NgModule({
  declarations: [
    AppComponent,
    FarmComponent,
    PersonnageFarmComponent,
    ZaapComponent,
    ZoneComponent,
    MonstreListeComponent,
    MonstreComponent,
    RessourceComponent,
    ResistancesComponent,
    HomeComponent,
    InventaireComponent,
    MetierComponent,
    TailleurComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatButtonModule,
    BrowserAnimationsModule,
    MatTooltipModule,
    MatCardModule,
    MatProgressBarModule,
    MatExpansionModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
