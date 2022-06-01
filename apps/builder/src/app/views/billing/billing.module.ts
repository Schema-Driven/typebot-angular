import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { Billing } from './billing.component';

@NgModule({
  declarations: [Billing],
  imports: [CommonModule, BrowserModule],
  exports: [CommonModule, Billing],
  providers: [],
})
export class BillingModule {}
