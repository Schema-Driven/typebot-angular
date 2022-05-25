import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

/* APP - ROUTES */
import { Authin } from './views/auth/authin/authin.component';
import { Home } from './views/home/home.component';
import { Login } from './views/login/login.component';
import { Dashboard  } from './views/dashboard/dashboard.component';



const routes: Routes = [
  { path: '', component: Home },
  { path: 'authin', component: Authin },
  { path: 'login', component: Login },
  { path: 'dashboard', component: Dashboard },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
