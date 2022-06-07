import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Share } from './share.component';

const routes: Routes = [
  {
    path: '',
    component: Share,
    children: [
      {
        path: '/share',
        loadChildren: () => import('./share.module').then((m) => m.ShareModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ShareRoutingModule {}
