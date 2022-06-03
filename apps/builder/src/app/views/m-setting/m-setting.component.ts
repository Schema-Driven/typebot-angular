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

  ngOnInit(): void {}

  navigate(links: any[]) {
    this.router.navigate(links);
  }

  
}
