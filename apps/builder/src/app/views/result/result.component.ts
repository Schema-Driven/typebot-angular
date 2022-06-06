import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css'],
})
export class Result implements OnInit {
  constructor(private router: Router) {
    // ...
  }

  ngOnInit(): void {}

  navigate(links: any[]) {
    this.router.navigate(links);
  }
}
