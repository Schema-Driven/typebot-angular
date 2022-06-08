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
  generalUpStatus() {
    this.generalUp = false;
  }
  generalDownStatus() {
    this.generalUp = true;
  }
  chatUpStatus() {
    this.chatUp = false;
  }
  chatDownStatus() {
    this.chatUp = true;
  }
  customCssUpStatus() {
    this.customCss = false;
  }
  customCssDownStatus() {
    this.customCss = true;
  }
}
