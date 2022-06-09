import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HeaderBarComponent } from './header-bar.component';
import { CommonModule } from '@angular/common';
@NgModule({
  imports: [CommonModule],
  declarations: [HeaderBarComponent],
  exports: [HeaderBarComponent],
})
export class HeaderBarModule {}
