import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { Dashboard } from './views/dashboard/dashboard.component';
import { PreferencesModule } from './views/preferences/preferences.module';
import { AccSettingModule } from './views/acc-setting/acc-setting.module';
import { MembersModule } from './views/members/members.module';
import { BillingModule } from './views/billing/billing.module';
import { HeaderBarModule } from './views/header/header-bar.module';
import { CreateModule } from './views/create/create.module';

import { HttpClientModule } from '@angular/common/http';
@NgModule({
  declarations: [AppComponent, Dashboard],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    PreferencesModule,
    AccSettingModule,
    MembersModule,
    BillingModule,
    CreateModule,
    HttpClientModule,
  ],
  exports: [AppRoutingModule, CommonModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
