import {
  Component,
  OnInit,
  ElementRef,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'previewchat',
  templateUrl: './previewchat.component.html',
  styleUrls: ['./previewchat.component.css'],
})
export class PreviewChat implements OnInit {
  constructor(private router: Router) {
    // ...
  }
  @Output() outputFromChild: EventEmitter<boolean> = new EventEmitter();
  @Input() showComp: boolean = false;
  outputText = false;
  toggle: boolean = false;
  ngOnInit(): void {
    console.log('preview Click');
  }
  popup = false;
  navigate(links: any[]) {
    this.router.navigate(links);
  }
  loader: boolean = false;
  sms = [
    {
      text: 'Hi',
      icon: true,
    },
  ];
  myArray = [
    {
      text: 'How are you?',
      icon: true,
    },
    {
      text: 'I am fine!',
      icon: true,
    },
    {
      text: 'And how are you?',
      icon: true,
    },
    {
      text: 'I am also fine!',
      icon: true,
    },
    {
      text: 'What are you doing?',
      icon: true,
    },
    {
      text: 'Nothing just working in office!',
      icon: true,
    },
    {
      text: 'Oh really?',
      icon: true,
    },
    // {
    //   text: 'Yes dude!',
    //   icon: true,
    // },
    // {
    //   text: 'Ok Take Care!',
    //   icon: true,
    // },
    // {
    //   text: 'Ok Take Care! and By',
    //   icon: true,
    // },
  ];
  i = 0;
  myInterval = setInterval(() => {
    if (this.myArray.length == this.i) {
      clearInterval(this.myInterval);
    } else {
      this.loader = true;
      this.sms[this.i].icon = false;
      this.addNewMessage(this.myArray[this.i]);
      this.i++;
    }
  }, 3000);

  addNewMessage(data: any) {
    setTimeout(() => {
      this.loader = false;
    }, 2000);
    this.sms.push(data);
    //console.log(data);
    //console.log('Sms Detail', this.sms);
  }
  compoClose() {
    this.showComp = false;
    console.log(this.showComp);
  }

  sendDataToParent() {
    this.outputFromChild.emit(this.outputText);
  }
}
