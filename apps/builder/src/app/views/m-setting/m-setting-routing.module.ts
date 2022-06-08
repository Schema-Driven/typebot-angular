import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MSetting } from './m-setting.component';

const routes: Routes = [
  {
    path: '',
    component: MSetting,
    children: [
      {
        path: '/msetting',
        loadChildren: () =>
          import('./m-setting.module').then((m) => m.MSettingModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MSettingRoutingModule {}
