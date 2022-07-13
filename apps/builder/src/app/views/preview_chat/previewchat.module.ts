import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { PreviewChat } from './previewchat.component';
import { CommonModule } from '@angular/common';
@NgModule({
  imports: [CommonModule],
  declarations: [PreviewChat],
  exports: [PreviewChat],
})
export class PreviewChatModule {}
