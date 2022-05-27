import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class Dashboard implements OnInit {

  constructor(private router: Router) {
    // ...
  }

  ngOnInit(): void {
  }

  navigate(links : any[]){
    this.router.navigate(links);
  }

}