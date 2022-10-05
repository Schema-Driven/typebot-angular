import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeRoutingModule } from './theme-routing.module';
import { Theme } from './theme.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { HeaderBarModule } from '../header/header-bar.module';
import { ChatBotModule } from '../../../../../viewer/src/app/components/chat-bot/chat-bot.module';
@NgModule({
  imports: [
    CommonModule,
    HeaderBarModule,
    ThemeRoutingModule,
    DragDropModule,
    ChatBotModule,
  ],
  declarations: [Theme],
})
export class ThemeModule {}
