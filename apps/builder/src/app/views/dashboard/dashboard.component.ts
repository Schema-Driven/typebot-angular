import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class Dashboard implements OnInit {
  constructor(private router: Router) {}
  menu: boolean = false;
  bill: boolean = false;
  popup: boolean = false;
  account: boolean = true;
  pref: boolean = false;
  setting: boolean = false;
  member: boolean = false;
  popup1: boolean = false;
  ngOnInit(): void {
    this.popup = false;
    this.popup1 = false;
  }

  navigate(links: any[]) {
    this.router.navigate(links);
  }
  popUpSet() {
    this.popup = true;
  }
  popUpSet1() {
    this.popup1 = !this.popup1;
  }
  ClickedOut1(event: any) {
    console.log(event);

    if (
      event.target.className ===
      'sec-popup flex items-end sm:items-center justify-center mt-14 p-4 text-center sm:p-0'
    ) {
      this.popup1 = false;
      console.log('OuteSide Click');
    }
  }
  myAccount() {
    this.account = true;
    this.pref = false;
    this.setting = false;
    this.member = false;
    this.bill = false;
  }
  myPreference() {
    this.pref = true;
    this.account = false;
    this.setting = false;
    this.member = false;
    this.bill = false;
  }
  mySetting() {
    this.setting = true;
    this.account = false;
    this.pref = false;
    this.member = false;
    this.bill = false;
  }
  myMember() {
    this.member = true;
    this.setting = false;
    this.account = false;
    this.pref = false;
    this.bill = false;
  }
  myBilling() {
    this.bill = true;
    this.member = false;
    this.setting = false;
    this.account = false;
    this.pref = false;
  }
  menuOffOn() {
    console.log('menu click');

    this.menu = !this.menu;
    //this.popup1 = !this.popup1;
  }
  ClickedOut(event: any) {
    console.log(event);

    if (
      event.target.className ===
      'flex items-end sm:items-center justify-center min-h-full p-4 text-center sm:p-0'
    ) {
      this.popup = false;
      console.log('OuteSide Click');
    }
  }
}
