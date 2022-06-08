import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MSettingRoutingModule } from './m-setting-routing.module';
import { MSetting } from './m-setting.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { HeaderBarModule } from '../header/header-bar.module';
@NgModule({
  imports: [
    CommonModule,
    HeaderBarModule,
    MSettingRoutingModule,
    DragDropModule,
  ],
  declarations: [MSetting],
})
export class MSettingModule {}
