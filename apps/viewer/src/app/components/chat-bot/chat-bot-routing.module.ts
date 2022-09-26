import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ContainerComponent } from './container.component';

const routes: Routes = [
  {
    path: '',
    component: ContainerComponent,
    children: [
      //add child-paths here ...
    ],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChatBotRoutingModule {}
