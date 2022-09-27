import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-text-input',
  templateUrl: './text-input.component.html',
  styleUrls: ['./text-input.component.css'],
})
export class TextInputComponent implements OnInit {
  @Input() placeHolderText: any = '';
  @Input() btnText: any = '';
  @Input() isLong: any = '';
  @Output() callbackFunction = new EventEmitter();
  receiverText: string = '';
  senderView: boolean = true;
  constructor() {}

  ngOnInit(): void {}

  changeInputEvent(event: any) {
    if (event.target.value !== '') {
      document
        .getElementById('changeInputEventBtn')
        ?.removeAttribute('disabled');
      event.target.setAttribute('value', event.target.value);
    } else {
      document
        .getElementById('changeInputEventBtn')
        ?.setAttribute('disabled', 'true');
    }
    this.receiverText = event.target.value;
  }

  InputView() {
    this.callbackFunc(event);
    this.senderView = false;
  }

  hideInputUserView() {
    this.senderView = true;
  }

  callbackFunc(e: any) {
    this.callbackFunction.emit(e);
  }
}
