import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewChat } from './view_chat.component';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
  imports: [CommonModule, BrowserModule],
  declarations: [ViewChat],
})
export class ViewChatModule {}
