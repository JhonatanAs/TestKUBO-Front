import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InicioComponent } from './components/inicio/inicio.component';
import { PublicationsComponent } from './components/publications/publications.component';

const routes: Routes = [
  { path: 'inicio', component: InicioComponent },
  { path: 'Publications', component: PublicationsComponent },
  { path: '',   redirectTo: '/inicio', pathMatch: 'full' }, // redirect to `first-component`
  { path: '**', component: InicioComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
