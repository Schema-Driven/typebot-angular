import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditorRoutingModule } from './editor-routing.module';
import { EditorComponent } from './editor.component';
import { HeaderBarModule } from '../header/header-bar.module';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { ListItemComponent } from './list-item/list-item.component';

@NgModule({
  imports: [CommonModule, HeaderBarModule, EditorRoutingModule, DragDropModule],
  declarations: [EditorComponent, ListItemComponent],
})
export class EditorModule {}
