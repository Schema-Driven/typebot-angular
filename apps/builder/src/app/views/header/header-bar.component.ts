import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'header-bar',
  templateUrl: './header-bar.component.html',
  styleUrls: ['./header-bar.component.css'],
})
export class HeaderBarComponent implements OnInit {
  constructor(private router: Router) {
    // ...
  }
  flowAct: boolean = true;
  themeAct: boolean = false;
  settingAct: boolean = false;
  shareAct: boolean = false;
  ngOnInit(): void {}

  navigate(links: any[]) {
    this.router.navigate(links);
    if (links[1] == 'editor') {
      this.flowClick();
    } else if (links[1] == 'theme') {
      this.themeClick();
    } else if (links[1] == 'msetting') {
      this.settingClick();
    } else if (links[1] == 'share') {
      this.shareClick();
    }
  }
  flowClick() {
    this.flowAct = true;
    this.themeAct = false;
    this.settingAct = false;
    this.shareAct = false;
  }
  themeClick() {
    this.flowAct = false;
    this.themeAct = true;
    this.settingAct = false;
    this.shareAct = false;
  }
  settingClick() {
    this.flowAct = false;
    this.themeAct = false;
    this.settingAct = true;
    this.shareAct = false;
  }
  shareClick() {
    this.flowAct = false;
    this.themeAct = false;
    this.settingAct = false;
    this.shareAct = true;
  }
}
