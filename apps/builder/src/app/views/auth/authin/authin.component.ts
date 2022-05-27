import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'authin',
  templateUrl: './authin.component.html',
  styleUrls: ['./authin.component.css']
})
export class Authin implements OnInit {

  constructor(private router: Router) {
    // ...
  }

  ngOnInit(): void {
  }

  navigate(links : any[]){
    this.router.navigate(links);
  }

}