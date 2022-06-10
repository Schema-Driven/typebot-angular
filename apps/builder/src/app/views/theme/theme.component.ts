import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'theme',
  templateUrl: './theme.component.html',
  styleUrls: ['./theme.component.css'],
})
export class Theme implements OnInit {
  constructor(private router: Router) {
    // ...
  }
  generalUp: boolean = false;
  chatUp: boolean = false;
  customCss: boolean = false;
  ngOnInit(): void {}

  navigate(links: any[]) {
    this.router.navigate(links);
  }
  generalStatusButton() {
    this.generalUp = !this.generalUp;
  }
  chatStatusButton() {
    this.chatUp = !this.chatUp;
  }
  customCssButton() {
    this.customCss = !this.customCss;
  }
}
