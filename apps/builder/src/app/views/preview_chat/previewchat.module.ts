import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { PreviewChat } from './previewchat.component';
import { CommonModule } from '@angular/common';

import { ChatBotModule } from '../../../../../viewer/src/app/components/chat-bot/chat-bot.module';
@NgModule({
  imports: [CommonModule, ChatBotModule],
  declarations: [PreviewChat],
  exports: [PreviewChat],
})
export class PreviewChatModule {}
