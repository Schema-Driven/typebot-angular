import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EditorRoutingModule } from './editor-routing.module';
import { EditorComponent } from './editor.component';

import { DragDropModule } from '@angular/cdk/drag-drop';

@NgModule({
  imports: [CommonModule, EditorRoutingModule, DragDropModule],
  declarations: [EditorComponent],
})
export class EditorModule {}
