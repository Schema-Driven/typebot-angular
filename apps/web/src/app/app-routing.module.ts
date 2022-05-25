import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

/* APP - ROUTES */
import { Authin } from './views/auth/authin/authin.component';
import { Home } from './views/home/home.component';
import { Auth } from './views/authin/auth/auth.component';



const routes: Routes = [
  { path: '', component: Home },
  { path: 'authin', component: Authin },
  { path: 'auth', component: Auth },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
