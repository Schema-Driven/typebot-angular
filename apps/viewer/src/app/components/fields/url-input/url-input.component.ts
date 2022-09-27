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
  constructor() {}

  ngOnInit(): void {
    console.log(this.placeHolderText, this.btnText);
  }

  changeInputEvent(event: any) {
    if (event.target.value !== '') {
      document
        .getElementById('changeUrlInputEventBtn')
        ?.removeAttribute('disabled');
      event.target.setAttribute('value', event.target.value);
      this.receiveText = event.target.value;
    } else {
      document
        .getElementById('changeUrlInputEventBtn')
        ?.setAttribute('disabled', 'true');
    }
  }

  InputView(event: any) {
    const isValid = event.target.reportValidity();
    if (isValid) {
      this.callbackFunc(event);
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
}
