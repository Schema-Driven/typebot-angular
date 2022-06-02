import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { Members } from '../members/members.component';

@NgModule({
  declarations: [Members],
  imports: [CommonModule, BrowserModule],
  exports: [CommonModule, Members],
  providers: [],
})
export class MembersModule {}
