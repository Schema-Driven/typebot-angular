import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ViewChatModule } from './components/view_chat/view_chat.module';

import { HttpClientModule } from '@angular/common/http';
import { EditorFieldsDataComponent } from './components/fields-data/editor-fields-data/editor-fields-data.component';

import { SafePipe } from './pipes/safe.pipe';
import { HtmlPipe } from './pipes/html.pipe';

@NgModule({
  declarations: [AppComponent, EditorFieldsDataComponent, SafePipe, HtmlPipe],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    FormsModule,
    ViewChatModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
