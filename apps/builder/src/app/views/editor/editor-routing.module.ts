import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DropTestComponent } from './drop-test/drop-test.component';

import { EditorComponent } from './editor.component';
import { Editorv2Component } from './v2/editor.component';

const routes: Routes = [
  {
    path: '',
    component: EditorComponent,
    children: [
      //add child-paths here ...
    ]
  },
  {
    path: 'drop-test',
    component: DropTestComponent,
    children: [
      //add child-paths here ...
    ],
  },
  {
    path: 'v2',
    component: Editorv2Component,
    children: [
      //add child-paths here ...
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditorRoutingModule {}
