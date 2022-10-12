import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { InventaireComponent } from './components/inventaire/inventaire.component';
import { MetierComponent } from './components/metier/metier.component';
import { PortailComponent } from './components/portail/portail.component';

const routes: Routes = [
  { path: '*', component: HomeComponent },
  { path: 'portail', component: PortailComponent},
  { path: 'metier', component: MetierComponent },
  { path: 'inventaire', component: InventaireComponent }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
