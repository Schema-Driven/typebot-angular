import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.css']
})
export class Setting implements OnInit {

  constructor(private router: Router) {
    // ...
  }

  ngOnInit(): void {
  }

  navigate(links : any[]){
    this.router.navigate(links);
  }
}