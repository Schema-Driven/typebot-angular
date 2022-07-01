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

  popupAct: boolean = false;
  ngOnInit(): void {}

  navigate(links: any[]) {
    this.router.navigate(links);
  }

  popUpSet() {
    this.popupAct = !this.popupAct;
    console.log('popUpset function');
  }
  ClickedOut(event: any) {
    console.log(event);
    if (
      event.target.className ===
      'sec-popup flex items-end sm:items-center justify-center mt-14 p-4 text-center sm:p-0'
    ) {
      this.popupAct = false;
      console.log('OuteSide Click');
    }
  }
}
