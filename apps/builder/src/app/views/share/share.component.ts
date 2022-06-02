import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'share',
  templateUrl: './share.component.html',
  styleUrls: ['./share.component.css'],
})
export class Share implements OnInit {
  constructor(private router: Router) {
    // ...
  }

  ngOnInit(): void {}

  navigate(links: any[]) {
    this.router.navigate(links);
  }
}
