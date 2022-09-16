import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Component({
  selector: 'viewchat',
  templateUrl: './view_chat.component.html',
  styleUrls: ['./view_chat.component.css'],
})
export class ViewChat implements OnInit {
  private _jsonURL = '../../../assets/editor.json';
  editorJson: any;

  constructor(private router: Router, private http: HttpClient) {
    this.getJSON().subscribe((data) => {
      this.editorJson = data;
      console.log(this.editorJson);
    });
  }

  public getJSON(): Observable<any> {
    return this.http.get(this._jsonURL);
  }

  ngOnInit() {}

  navigate(links: any[]) {
    this.router.navigate(links);
  }
  loader: boolean = false;
  // sms = [
  //   {
  //     text: 'Hi',
  //     icon: true,
  //   },
  // ];
  // myArray = [
  //   {
  //     text: 'How are you?',
  //     icon: true,
  //   },
  //   {
  //     text: 'I am fine!',
  //     icon: true,
  //   },
  //   {
  //     text: 'And how are you?',
  //     icon: true,
  //   },
  //   {
  //     text: 'I am also fine!',
  //     icon: true,
  //   },
  //   {
  //     text: 'What are you doing?',
  //     icon: true,
  //   },
  //   {
  //     text: 'Nothing just working in office!',
  //     icon: true,
  //   },
  //   {
  //     text: 'Oh really?',
  //     icon: true,
  //   },
  //   {
  //     text: 'Yes dude!',
  //     icon: true,
  //   },
  //   {
  //     text: 'Ok Take Care!',
  //     icon: true,
  //   },
  //   {
  //     text: 'Ok Take Care! and By',
  //     icon: true,
  //   },
  // ];
  // i = 0;

  // myInterval = setInterval(() => {
  //   if (this.myArray.length == this.i) {
  //     clearInterval(this.myInterval);
  //   } else {
  //     this.loader = true;
  //     this.sms[this.i].icon = false;
  //     this.addNewMessage(this.myArray[this.i]);
  //     this.i++;
  //   }
  // }, 3000);

  // addNewMessage(data: any) {
  //   setTimeout(() => {
  //     this.loader = false;
  //   }, 2000);
  //   this.sms.push(data);
  //   console.log(data);
  //   console.log('Sms Detail', this.sms);
  // }
}
