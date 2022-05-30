import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
})
export class Create implements OnInit {
  constructor(private router: Router) {
    // ...
  }

  ngOnInit(): void {}

  navigate(links: any[]) {
    this.router.navigate(links);
  }
}
