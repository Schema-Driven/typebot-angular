import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-number-input',
  templateUrl: './number-input.component.html',
  styleUrls: ['./number-input.component.css'],
})
export class NumberInputComponent implements OnInit {
  @Input() placeHolderText: any = '';
  @Input() btnText: any = '';
  @Input() minValue: any = '';
  @Input() maxValue: any = '';
  @Input() stepValue: any = '';
  @Output() callbackFunction = new EventEmitter();
  receiverText: string = '';
  senderView: boolean = true;
  constructor() {}

  ngOnInit(): void {}

  changeInputEvent(event: any) {
    if (event.target.value !== '') {
      document
        .getElementById('changeNumberInputEventBtn')
        ?.removeAttribute('disabled');
      event.target.setAttribute('value', event.target.value);
    } else {
      document
        .getElementById('changeNumberInputEventBtn')
        ?.setAttribute('disabled', 'true');
    }
    this.receiverText = event.target.value;
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
