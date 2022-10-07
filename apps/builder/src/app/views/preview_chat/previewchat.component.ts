import { CdkDragMove } from '@angular/cdk/drag-drop';
import {
  Component,
  OnInit,
  ElementRef,
  Input,
  Output,
  EventEmitter,
  ViewChild,
  NgZone,
} from '@angular/core';
import { Router } from '@angular/router';
import { EditorComponent } from '../editor/editor.component';

@Component({
  selector: 'previewchat',
  templateUrl: './previewchat.component.html',
  styleUrls: ['./previewchat.component.css'],
})
export class PreviewChat implements OnInit {
  previewChat: boolean = true;
  @Output() outputFromChild: EventEmitter<boolean> = new EventEmitter();
  @Input() showComp: boolean = false;
  outputText = false;
  toggle: boolean = false;
  popup = false;
  loader: boolean = false;
  i = 0;

  constructor(
    private router: Router,
    private editorComponent: EditorComponent
  ) {
    // ...
  }

  ngOnInit(): void {
    console.log('preview Click');
  }

  navigate(links: any[]) {
    this.router.navigate(links);
  }

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
  ];

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
    this.editorComponent.previewChat = false;
  }

  dragStart(event: any) {
    let colElement = document.getElementById('col-resizer');
  }
}
