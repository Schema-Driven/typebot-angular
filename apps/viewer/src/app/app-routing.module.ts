import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewChat } from './components/view_chat/view_chat.component';

const routes: Routes = [
  { path: 'viewchat', component: ViewChat },
  {
    path: '',
    loadChildren: () =>
      import('./components/chat-bot/chat-bot.module').then(
        (m) => m.ChatBotModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
