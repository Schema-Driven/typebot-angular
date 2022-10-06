import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatBotRoutingModule } from './chat-bot-routing.module';
import { ContainerComponent } from './container.component';

import { UrlInputComponent } from '../fields/url-input/url-input.component';
import { TextInputComponent } from '../fields/text-input/text-input.component';
import { NumberInputComponent } from '../fields/number-input/number-input.component';
import { EmailInputComponent } from '../fields/email-input/email-input.component';
import { DateInputComponent } from '../fields/date-input/date-input.component';
import { PhoneInputModule } from '../fields/phone-input/phone-input.module';

import { SafePipe } from '../../pipes/safe.pipe';
import { HtmlPipe } from '../../pipes/html.pipe';

@NgModule({
  declarations: [
    ContainerComponent,
    UrlInputComponent,
    TextInputComponent,
    NumberInputComponent,
    EmailInputComponent,
    DateInputComponent,
    SafePipe,
    HtmlPipe,
  ],
  imports: [CommonModule, ChatBotRoutingModule, PhoneInputModule],
  exports: [ContainerComponent],
})
export class ChatBotModule {}
