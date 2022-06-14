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
    inputElement.select();
    //document.execCommand('copy');
    inputElement.setSelectionRange(0, 0);
    //console.log(inputElement.value);
  }
  // changeValue(val:any) {
  //   console.log(val.value);
  //   val = 'copied';
  //   setTimeout(function () {
  //     val='copy';
  //   }.bind(this), 5000);
  //   console.log('test');
  // };
  popUpSet() {
    this.popup = true;
  }
  ClickedOut(event: any) {
    if (
      event.target.className ===
      'flex items-end sm:items-center justify-center min-h-full p-4 text-center sm:p-0'
    ) {
      this.popup = false;
      console.log('OuteSide Click');
    }
  }
}
