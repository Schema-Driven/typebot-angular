import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatBotRoutingModule } from './chat-bot-routing.module';
import { ContainerComponent } from './container.component';


@NgModule({
  declarations: [
    ContainerComponent
  ],
  imports: [
    CommonModule,
    ChatBotRoutingModule
  ]
})
export class ChatBotModule { }
