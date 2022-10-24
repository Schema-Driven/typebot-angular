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
  reloader: boolean = true;
  i = 0;
  oldx = 0;

  constructor(
    private router: Router,
    private editorComponent: EditorComponent
  ) {}

  ngOnInit(): void {}

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
  }

  sendDataToParent() {
    this.outputFromChild.emit(this.outputText);
    this.editorComponent.previewChat = false;
  }

  dragStart() {
    const minimum_size = 20;
    let original_width = 0;
    let original_height = 0;
    let original_x = 0;
    let original_y = 0;
    let original_mouse_x = 0;
    let original_mouse_y = 0;
    let colElement = <HTMLElement>document.getElementById('col-resizer');
    let btn = <HTMLInputElement>document.getElementById('resize-btn');
    btn.addEventListener('mousedown', function (e: any) {
      console.log(e);
      e.preventDefault();
      original_width = parseFloat(
        getComputedStyle(colElement, null)
          .getPropertyValue('width')
          .replace('px', '')
      );
      original_height = parseFloat(
        getComputedStyle(colElement, null)
          .getPropertyValue('height')
          .replace('px', '')
      );
      original_x = colElement.getBoundingClientRect().left;
      original_y = colElement.getBoundingClientRect().top;
      original_mouse_x = e.pageX;
      original_mouse_y = e.pageY;
      window.addEventListener('mousemove', resize);
      window.addEventListener('mouseup', stopResize);
    });
    function resize(e: any) {
      // const height = original_height + (e.pageY - original_mouse_y);
      const width = original_width - (e.pageX - original_mouse_x);
      // if (height > minimum_size) {
      //   colElement.style.height = height + 'px';
      // }
      if (width > minimum_size && width >= 450) {
        colElement.style.width = width + 'px';
        // colElement.style.left =
        //   original_x + (e.pageX - original_mouse_x) + 'px';
      }
    }

    function stopResize() {
      window.removeEventListener('mousemove', resize);
    }
  }

  reloadComp() {
    this.reloader = false;
    setTimeout(() => {
      this.reloader = true;
    }, 0.01);
  }
}
