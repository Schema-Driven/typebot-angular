import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ViewChatModule } from './components/view_chat/view_chat.module';

import { HttpClientModule } from '@angular/common/http';
import { EditorFieldsDataComponent } from './components/fields/editor-fields-data/editor-fields-data.component';

@NgModule({
  declarations: [AppComponent, EditorFieldsDataComponent],
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
