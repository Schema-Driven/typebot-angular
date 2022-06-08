import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'm-setting',
  templateUrl: './m-setting.component.html',
  styleUrls: ['./m-setting.component.css'],
})
export class MSetting implements OnInit {
  constructor(private router: Router) {
    // ...
  }
  generalUp: boolean = false;
  typingUp: boolean = false;
  metaDataUp: boolean = false;
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
  typingUpStatus() {
    this.typingUp = false;
  }
  typingDownStatus() {
    this.typingUp = true;
  }
  metaDataUpStatus() {
    this.metaDataUp = false;
  }
  metaDataDownStatus() {
    this.metaDataUp = true;
  }
}
