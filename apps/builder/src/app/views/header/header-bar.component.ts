import { Component, OnInit, Output, EventEmitter } from '@angular/core';
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

  flowAct: boolean = false;
  themeAct: boolean = false;
  settingAct: boolean = false;
  shareAct: boolean = false;
  showComp: boolean = false;
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
    console.log('Flow click');
    this.flowAct = true;
    this.themeAct = false;
    this.settingAct = false;
    this.shareAct = false;
  }
  themeClick() {
    console.log('Theme click');
    this.flowAct = false;
    this.themeAct = true;
    this.settingAct = false;
    this.shareAct = false;
  }
  settingClick() {
    console.log('Setting click');
    this.flowAct = false;
    this.themeAct = false;
    this.settingAct = true;
    this.shareAct = false;
  }
  shareClick() {
    console.log('Share click');
    this.flowAct = false;
    this.themeAct = false;
    this.settingAct = false;
    this.shareAct = true;
  }
  onPress() {
    this.showComp = true;
  }
  receiveChildData(data: any) {
    console.log(data);
    this.showComp = data;
  }

  changeUrl() {
    this.navigate(['/', 'editor']);
  }
}
