import { Component, AfterContentInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { EditorService } from '../../services/editor.service';

@Component({
  selector: 'header-bar',
  templateUrl: './header-bar.component.html',
  styleUrls: ['./header-bar.component.css'],
})
export class HeaderBarComponent implements AfterContentInit {
  flowAct: boolean = false;
  themeAct: boolean = false;
  settingAct: boolean = false;
  shareAct: boolean = false;
  showComp: boolean = false;
  clickEventSubscription: Subscription;

  constructor(private router: Router, private shared: EditorService) {
    // ...

    this.clickEventSubscription = this.shared.getClickEvent().subscribe(() => {
      this.onPress();
    });
  }

  ngAfterContentInit(): void {
    if (window.location.pathname === '/editor') {
      this.flowClick();
    } else if (window.location.pathname === '/theme') {
      this.themeClick();
    } else if (window.location.pathname === '/msetting') {
      this.settingClick();
    } else if (window.location.pathname === '/share') {
      this.shareClick();
    }
  }

  navigate(links: any[]) {
    this.router.navigate(links);
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
  onPress() {
    this.showComp = true;
  }
  receiveChildData(data: any) {
    console.log(data);
    this.showComp = data;
  }
}
