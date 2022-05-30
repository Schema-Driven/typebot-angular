import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'home',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class Login implements OnInit {
  constructor(private router: Router) {
    // ...
  }

  ngOnInit(): void {}

  navigate(links: any[]) {
    this.router.navigate(links);
  }
}
