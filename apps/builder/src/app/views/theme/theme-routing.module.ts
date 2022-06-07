import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Theme } from './theme.component';

const routes: Routes = [
  {
    path: '',
    component: Theme,
    children: [
      {
        path: '/theme',
        loadChildren: () => import('./theme.module').then((m) => m.ThemeModule),
        // import('./views/theme/ThemeRoutingModule.module').then((m) => m.ThemeRoutingModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ThemeRoutingModule {}
