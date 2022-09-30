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
  receiverText: string = '';
  senderView: boolean = true;
  editable: boolean = true;
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
    if (event.detail === 0) {
      const isValid = event.target.reportValidity();
      if (isValid) {
        this.callbackFunc(event.target.value);
        this.senderView = false;
      }
    } else if (event.detail === 1) {
      const isValid = event.target.previousSibling.reportValidity();
      if (isValid) {
        this.callbackFunc(event.target.previousSibling.value);
        this.senderView = false;
      }
    }
  }

  hideInputUserView() {
    this.senderView = true;
  }

  callbackFunc(e: any) {
    if (this.editable === true) {
      this.callbackFunction.emit(e);
      this.editable = false;
    }
  }
}
