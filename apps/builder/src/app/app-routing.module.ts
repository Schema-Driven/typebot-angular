import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
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
import { Share } from './views/share/share.component';
import { Theme } from './views/theme/theme.component';
import { MSetting } from './views/m-setting/m-setting.component';
import { Result } from './views/result/result.component';

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
  //{ path: 'share', component: Share },
  //{ path: 'theme', component: Theme },
  //{ path: 'm-setting', component: MSetting },
  { path: 'result', component: Result },
  {
    path: 'editor',
    loadChildren: () =>
      import('./views/editor/editor.module').then((m) => m.EditorModule),
  },
  {
    path: 'theme',
    loadChildren: () =>
      import('./views/theme/theme.module').then((m) => m.ThemeModule),
  },
  {
    path: 'msetting',
    loadChildren: () =>
      import('./views/m-setting/m-setting.module').then(
        (m) => m.MSettingModule
      ),
  },
  {
    path: 'share',
    loadChildren: () =>
      import('./views/share/share.module').then((m) => m.ShareModule),
  },
  { path: 'billing', component: Billing },
  { path: 'create-new', component: CreateNew },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
