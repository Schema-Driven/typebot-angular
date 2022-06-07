import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShareRoutingModule } from './share-routing.module';
import { Share } from './share.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { HeaderBarModule } from '../header/header-bar.module';
@NgModule({
  imports: [CommonModule, HeaderBarModule, ShareRoutingModule, DragDropModule],
  declarations: [Share],
})
export class ShareModule {}
