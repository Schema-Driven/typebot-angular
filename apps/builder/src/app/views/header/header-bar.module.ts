import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HeaderBarComponent } from './header-bar.component';
import { CommonModule } from '@angular/common';
import { PreviewChatModule } from '../preview_chat/previewchat.module';
@NgModule({
  imports: [CommonModule, PreviewChatModule],
  declarations: [HeaderBarComponent],
  exports: [HeaderBarComponent],
})
export class HeaderBarModule {}
