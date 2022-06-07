import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { HeaderBarComponent } from './header-bar.component';

@NgModule({
  declarations: [HeaderBarComponent],
  imports: [CommonModule, BrowserModule],
  exports: [HeaderBarComponent],
  providers: [],
})
export class HeaderBarModule {}
