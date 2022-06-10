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
}
