import { Component, OnInit, ElementRef } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'share',
  templateUrl: './preview_chat.component.html',
  styleUrls: ['./preview_chat.component.css'],
})
export class Share implements OnInit {
  constructor(private router: Router) {
    // ...
  }
  toggle: boolean = false;
  ngOnInit(): void {}
  popup = false;
  navigate(links: any[]) {
    this.router.navigate(links);
  }
}
