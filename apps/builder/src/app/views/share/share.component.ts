import { Component, OnInit, ElementRef } from '@angular/core';
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
  toggle: boolean = false;
  ngOnInit(): void {}
  popup = false;
  navigate(links: any[]) {
    this.router.navigate(links);
  }
  changeColor() {
    this.toggle = true;
  }
  changeColor1() {
    this.toggle = false;
  }
  copyInputMessage(inputElement: any, val: any) {
    console.log(inputElement);

    inputElement.select();
    inputElement.setSelectionRange(0, 0);
  }

  popUpSet() {
    this.popup = !this.popup;
  }
  ClickedOut(event: any) {
    console.log(event);

    if (
      event.target.className ===
      'flex items-end sm:items-center justify-center mt-14 p-4 text-center sm:p-0'
    ) {
      this.popup = false;
      console.log('OuteSide Click');
    }
  }
}
