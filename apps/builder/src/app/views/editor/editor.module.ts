import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditorRoutingModule } from './editor-routing.module';
import { EditorComponent } from './editor.component';
import { HeaderBarModule } from '../header/header-bar.module';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { ListItemComponent } from './list-item/list-item.component';
import { DropTestComponent } from './drop-test/drop-test.component';
import { Editorv2Component } from './v2/editor.component';

@NgModule({
  imports: [CommonModule, HeaderBarModule, EditorRoutingModule, DragDropModule],
  declarations: [EditorComponent, ListItemComponent, DropTestComponent, Editorv2Component],
})
export class EditorModule {}
