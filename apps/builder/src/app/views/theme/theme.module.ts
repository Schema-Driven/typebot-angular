import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeRoutingModule } from './theme-routing.module';
import { Theme } from './theme.component';
import { DragDropModule } from '@angular/cdk/drag-drop';

@NgModule({
  imports: [CommonModule, ThemeRoutingModule, DragDropModule],
  declarations: [Theme],
})
export class ThemeModule {}
