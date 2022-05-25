import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

/* APP - ROUTES */
import { Authin } from './views/auth/authin/authin.component';
import { Home } from './views/home/home.component';
import { Login } from './views/login/login.component';
import { Dashboard  } from './views/dashboard/dashboard.component';
import { Create  } from './views/create/create.component';



const routes: Routes = [
  { path: '', component: Home },
  { path: 'authin', component: Authin },
  { path: 'login', component: Login },
  { path: 'dashboard', component: Dashboard },
  { path: 'create', component: Create },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
