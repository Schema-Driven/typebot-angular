import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditorRoutingModule } from './editor-routing.module';
import { EditorComponent } from './editor.component';
import { HeaderBarModule } from '../header/header-bar.module';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { DropTestComponent } from './drop-test/drop-test.component';

import { NgbPopoverModule } from '@ng-bootstrap/ng-bootstrap';

/** TODO: remove it later */
import { ListItemComponent } from './v1/list-item/list-item.component';
import { EditorV1Component } from './v1/editor.component';
import { EditorFieldsComponent } from './editor-fields/editor-fields.component';
import { TextFieldComponent } from './editor-fields/text-field/text-field.component';
import { RadioFieldComponent } from './editor-fields/radio-field/radio-field.component';
import { NumberFieldComponent } from './editor-fields/number-field/number-field.component';
import { ModalContentComponent } from './modal-content/modal-content.component';

@NgModule({
  imports: [CommonModule, HeaderBarModule, EditorRoutingModule, DragDropModule, NgbPopoverModule],
  declarations: [ListItemComponent, DropTestComponent, EditorV1Component, EditorComponent, EditorFieldsComponent, TextFieldComponent, RadioFieldComponent, NumberFieldComponent, ModalContentComponent],
})
export class EditorModule {}
