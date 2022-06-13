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
  ngOnInit(): void {
    this.popup = false;
  }

  navigate(links: any[]) {
    this.router.navigate(links);
  }
  popUpSet() {
    this.popup = true;
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
    this.menu = !this.menu;
  }
  ClickedOut(event: any) {
    if(event.target.className === "flex items-end sm:items-center justify-center min-h-full p-4 text-center sm:p-0") 
    {
      this.popup = false;
      console.log("OuteSide Click");
    } 
 }
}
