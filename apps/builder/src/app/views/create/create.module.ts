import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Create } from './create.component';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
  imports: [CommonModule, BrowserModule],
  declarations: [Create],
})
export class CreateModule {}
