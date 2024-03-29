import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-url-input',
  templateUrl: './url-input.component.html',
  styleUrls: ['./url-input.component.css'],
})
export class UrlInputComponent implements OnInit {
  @Input() placeHolderText: any = '';
  @Input() btnText: any = '';
  @Output() callbackFunction = new EventEmitter();
  receiveText: string = '';
  senderView: boolean = true;
  editable: boolean = true;
  onInput = 0;
  constructor() {}

  ngOnInit(): void {}

  changeInputEvent(event: any) {
    if (this.onInput == 0) {
      event.target.value = 'https://';
    }
    if (event.target.value !== '') {
      this.onInput = 1;
      document
        .getElementById('changeUrlInputEventBtn')
        ?.removeAttribute('disabled');
      event.target.setAttribute('value', event.target.value);
      this.receiveText = event.target.value;
    } else {
      this.onInput = 0;
      document
        .getElementById('changeUrlInputEventBtn')
        ?.setAttribute('disabled', 'true');
    }
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
