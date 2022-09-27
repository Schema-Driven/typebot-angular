import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-email-input',
  templateUrl: './email-input.component.html',
  styleUrls: ['./email-input.component.css'],
})
export class EmailInputComponent implements OnInit {
  @Input() placeHolderText: any = '';
  @Input() btnText: any = '';
  @Input() error: any = '';
  @Output() callbackFunction = new EventEmitter();
  @Output() callbackFunctionEnter = new EventEmitter();
  receiverText: string = '';
  senderView: boolean = true;
  constructor() {}

  ngOnInit(): void {}

  changeInputEvent(event: any) {
    if (event.target.value !== '') {
      document
        .getElementById('changeEmailInputEventBtn')
        ?.removeAttribute('disabled');
      event.target.setAttribute('value', event.target.value);
    } else {
      document
        .getElementById('changeEmailInputEventBtn')
        ?.setAttribute('disabled', 'true');
    }
    this.receiverText = event.target.value;
  }

  InputView(event: any) {
    const isValid = event.target.reportValidity();
    if (isValid) {
      this.callbackFuncEnter(event);
      this.senderView = false;
    }
  }

  clickInputView(event: any) {
    const isValid = event.target.previousSibling.reportValidity();
    if (isValid) {
      this.callbackFunc(event);
      this.senderView = false;
    }
  }

  hideInputUserView() {
    this.senderView = true;
  }

  callbackFunc(e: any) {
    this.callbackFunction.emit(e);
  }

  callbackFuncEnter(e: any) {
    this.callbackFunctionEnter.emit(e);
  }
}
