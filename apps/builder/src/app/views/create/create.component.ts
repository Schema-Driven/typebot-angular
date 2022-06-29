import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
})
export class Create implements OnInit {
  constructor(private router: Router) {
    // ...
  }
  popup: boolean = false;
  ngOnInit(): void {}

  navigate(links: any[]) {
    this.router.navigate(links);
  }
  popUpSet() {
    this.popup = !this.popup;
    console.log('popUpset function');
  }
  ClickedOut(event: any) {
    console.log(event);
    if (
      event.target.className ===
      'sec-popup flex items-end sm:items-center justify-center mt-14 p-4 text-center sm:p-0'
    ) {
      this.popup = false;
      console.log('OuteSide Click');
    }
  }
}
