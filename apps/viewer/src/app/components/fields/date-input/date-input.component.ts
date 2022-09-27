import { HtmlParser } from '@angular/compiler';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { concat } from 'rxjs';

@Component({
  selector: 'app-date-input',
  templateUrl: './date-input.component.html',
  styleUrls: ['./date-input.component.css'],
})
export class DateInputComponent implements OnInit {
  @Input() placeHolderText: any = '';
  @Input() btnText: any = '';
  @Input() error: any = '';
  @Input() rangeValue: any = '';
  @Input() timeValue: any = '';
  @Input() fromLabel: any = '';
  @Input() toLabel: any = '';
  @Output() callbackFunction = new EventEmitter();
  receiverText: any = '';
  senderView: boolean = true;
  constructor() {}

  ngOnInit(): void {}

  changeInputEvent(event: any) {
    if (event.target.value !== '') {
      document
        .getElementById('changeDateInputEventBtn')
        ?.removeAttribute('disabled');
      if (this.rangeValue === true) {
        let ele1 = <HTMLInputElement>document.getElementById('fromDate');
        ele1?.setAttribute('value', ele1?.value);
        let ele2 = <HTMLInputElement>document.getElementById('toDate');
        ele2?.setAttribute('value', ele2?.value);
        this.receiverText = ele1.value + ' to ' + ele2.value;
      } else {
        this.receiverText = event.target.value;
      }
    } else {
      document
        .getElementById('changeDateInputEventBtn')
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
