import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { Dashboard } from './views/dashboard/dashboard.component';
import { Preferences } from './views/preferences/preferences.component';

@NgModule({
  declarations: [AppComponent,Dashboard],
  imports: [CommonModule, BrowserModule, AppRoutingModule],
  exports: [AppRoutingModule,CommonModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
