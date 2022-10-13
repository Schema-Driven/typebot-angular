import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { concat } from 'rxjs';

@Component({
  selector: 'app-choice-input',
  templateUrl: './choice-input.component.html',
  styleUrls: ['./choice-input.component.css'],
})
export class ChoiceInputComponent implements OnInit {
  @Input() items: any = [];
  @Input() multipleChoice: boolean = false;
  @Output() callbackFunction = new EventEmitter();
  @Output() nextStep = new EventEmitter();
  receiverText: any = '';
  senderView: boolean = true;
  editable: boolean = true;
  sendBtn: boolean = false;
  callFuncOnce: boolean = true;
  result: string = '';
  constructor() {}

  ngOnInit(): void {}

  clickEvent(event: any) {
    if (this.multipleChoice === false) {
      this.receiverText = event.target.innerText;
      this.senderView = false;
      if (this.callFuncOnce === true) {
        this.callbackFunction.emit(event.target.id);
        this.callFuncOnce = false;
      }
    } else {
      if (event.target.classList.contains('selectable')) {
        event.target.classList.remove('selectable');
        this.result = this.result.concat(event.target.innerText + ', ');
        this.receiverText = this.result;
        this.sendBtn = true;
      } else {
        event.target.classList.add('selectable');
        this.result = this.result.replace(event.target.innerText, '');
      }
    }
  }

  hideInputUserView() {
    this.senderView = true;
    this.result = '';
  }

  sendEvent() {
    this.senderView = false;
    this.sendBtn = false;
    this.result = '';
    this.nextStep.emit();
  }
}
