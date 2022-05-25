import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

/* APP - ROUTES */
import { Authin } from './views/auth/authin/authin.component';
import { Home } from './views/home/home.component';



const routes: Routes = [
  { path: '', component: Home },
  { path: 'authin', component: Authin },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
