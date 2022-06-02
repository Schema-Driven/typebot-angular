import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { Accsetting } from './acc-setting.component';

@NgModule({
  declarations: [Accsetting],
  imports: [CommonModule, BrowserModule],
  exports: [CommonModule, Accsetting],
  providers: [],
})
export class AccSettingModule {}
