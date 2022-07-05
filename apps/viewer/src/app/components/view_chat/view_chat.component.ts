import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'viewchat',
  templateUrl: './view_chat.component.html',
  styleUrls: ['./view_chat.component.css'],
})
export class ViewChat implements OnInit {
  constructor(private router: Router) {}

  items = ['test 01', 'test 02', 'test 03'];
  currentItem: any;
  newarray = [];
  private pointer: number = 0;
  private interval: any;

  loader: boolean = false;
  ngOnInit() {}

  navigate(links: any[]) {
    this.router.navigate(links);
  }

  sms = [
    {
      text: 'Hi',
    },
    {
      text: 'How are you?',
    },
    {
      text: 'What are you doing?',
    },
  ];

  test = setInterval(() => {
    this.loader = false;
    this.currentItem = this.sms[this.pointer];
    this.pointer++;
    if (this.pointer > 2) {
      this.pointer = 0;
      this.loader = true;
      this.stop();
    }
  }, 2000);

  stop() {
    clearInterval(this.test);
    this.loader = false;
  }
  // test=setInterval(() => {
  //   this.loader=true;
  //   console.log(this.loader);
  //   }, 5000)
}
