import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditorFieldsDataComponent } from './editor-fields-data.component';

const routes: Routes = [
  {
    path: '',
    component: EditorFieldsDataComponent,
    children: [
      //add child-paths here ...
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditorFieldsDataRoutingModule {}
