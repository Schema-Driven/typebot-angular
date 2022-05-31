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
  popup: boolean = false;
  ngOnInit(): void {
    this.popup = false;
  }

  navigate(links: any[]) {
    this.router.navigate(links);
  }
  popUpSet() {
    this.popup = true;
  }
}
