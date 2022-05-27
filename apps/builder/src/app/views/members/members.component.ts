import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.css']
})
export class Members implements OnInit {

  constructor(private router: Router) {
    // ...
  }

  ngOnInit(): void {
  }

  navigate(links : any[]){
    this.router.navigate(links);
  }
}