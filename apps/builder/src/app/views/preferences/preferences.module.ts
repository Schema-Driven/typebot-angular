import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { Preferences } from '../preferences/preferences.component';

@NgModule({
  declarations: [Preferences],
  imports: [CommonModule, BrowserModule],
  exports: [CommonModule, Preferences],
  providers: [],
})
export class PreferencesModule {}
