import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'acc-setting',
  templateUrl: './acc-setting.component.html',
  styleUrls: ['./acc-setting.component.css']
})
export class Accsetting implements OnInit {

  constructor(private router: Router) {
    // ...
  }

  ngOnInit(): void {
  }

  navigate(links : any[]){
    this.router.navigate(links);
  }

}