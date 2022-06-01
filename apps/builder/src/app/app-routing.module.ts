import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

/* APP - ROUTES */
import { Authin } from './views/auth/authin/authin.component';
import { Home } from './views/home/home.component';
import { Login } from './views/login/login.component';
import { Dashboard } from './views/dashboard/dashboard.component';
import { Create } from './views/create/create.component';
import { Setting } from './views/setting/setting.component';
import { Preferences } from './views/preferences/preferences.component';
import { Members } from './views/members/members.component';
import { Accsetting } from './views/acc-setting/acc-setting.component';
import { Billing } from './views/billing/billing.component';
import { CreateNew } from './views/create-new/create-new.component';

const routes: Routes = [
  { path: '', component: Authin },
  { path: 'authin', component: Authin },
  { path: 'login', component: Login },
  { path: 'dashboard', component: Dashboard },
  { path: 'create', component: Create },
  { path: 'setting', component: Setting },
  { path: 'preferences', component: Preferences },
  { path: 'members', component: Members },
  { path: 'acc-setting', component: Accsetting },
  {
    path: 'editor',
    loadChildren: () =>
      import('./views/editor/editor.module').then((m) => m.EditorModule),
  },
  { path: 'billing', component: Billing },
  { path: 'create-new', component: CreateNew },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
