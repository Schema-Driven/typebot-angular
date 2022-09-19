import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewChat } from './components/view_chat/view_chat.component';

const routes: Routes = [
  { path: 'viewchat', component: ViewChat },
  {
    path: 'editor-fields-data',
    loadChildren: () =>
      import(
        './components/fields-data/editor-fields-data/editor-fields-data.module'
      ).then((m) => m.EditorFieldsDataModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
