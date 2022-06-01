import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.css'],
})
export class Setting implements OnInit {
  constructor(private router: Router) {}

  myAccount: boolean = true;
  myPreference: boolean = false;
  ngOnInit(): void {
    this.myAccount = true;
    this.myPreference = false;
  }

  navigate(links: any[]) {
    this.router.navigate(links);
  }
  myAccountDetail() {
    console.log('my account');

    this.myAccount = true;
    this.myPreference = false;
  }
  myPreferenceDetail() {
    console.log('my preference');

    this.myPreference = true;
    this.myAccount = false;
  }
}
