import { asNativeElements, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-editor-fields-data',
  templateUrl: './editor-fields-data.component.html',
  styleUrls: ['./editor-fields-data.component.css'],
})
export class EditorFieldsDataComponent implements OnInit {
  private _jsonURL = '../../../assets/editor.json';
  editorJson: any;
  newArray: any;
  fullArray: any;
  element: any;
  reset: any;
  offset: any;

  receiverText: string = '';
  receiveNumberText: number = 0;
  receiveEmailText: string = '';
  receiveURLText: string = '';
  receiveDateText: string = '';

  loader: boolean = false;
  receiverTextView: boolean = false;
  senderTextView: boolean = true;

  receiverNumberView: boolean = false;
  senderNumberView: boolean = true;

  receiverEmailView: boolean = false;
  senderEmailView: boolean = true;

  receiverURLView: boolean = false;
  senderURLView: boolean = true;

  receiverDateView: boolean = false;
  senderDateView: boolean = true;

  constructor(private http: HttpClient) {
    this.getJSON().subscribe((data) => {
      this.editorJson = data;
      this.fullArray = this.editorJson?.groups;
      this.newArray = Array.from(this.editorJson?.groups[1]);
      console.log(
        this.editorJson,
        ' Groups',
        this.fullArray,
        'length',
        this.fullArray.length,
        this.newArray
      );
    });
  }

  i = 0;
  myInterval = setInterval(() => {
    if (this.fullArray.length == this.i) {
      clearInterval(this.myInterval);
    } else {
      this.loader = true;
      this.addNewMessage(this.fullArray[this.i]);
      this.i++;
    }
  }, 3000);

  addNewMessage(data2: any) {
    setTimeout(() => {
      this.loader = false;
    }, 2000);
    this.newArray.push(data2);
    this.offset = document.getElementById('flex-col')?.offsetHeight;
    console.log(this.offset);
    // this.element = <HTMLSelectElement>document.getElementById('flex-image');
    // this.element.style.top = this.offset + 'px';
    // this.offset = 0;
  }

  ngOnInit(): void {}

  public getJSON(): Observable<any> {
    return this.http.get(this._jsonURL);
  }

  changeTextInputEvent(event: any) {
    if (event.target.value !== '') {
      document
        .getElementById('changeTextInputEventBtn')
        ?.removeAttribute('disabled');
      event.target.setAttribute('value', event.target.value);
    } else {
      document
        .getElementById('changeTextInputEventBtn')
        ?.setAttribute('disabled', 'true');
    }
    this.receiverText = event.target.value;
  }

  textInputView() {
    this.senderTextView = false;
    this.receiverTextView = true;
    return true;
  }

  hideTextInputUserView() {
    this.senderTextView = true;
    this.receiverTextView = false;
  }

  changeNumberInputEvent(event: any) {
    if (event.target.value !== '') {
      document
        .getElementById('changeNumberInputEventBtn')
        ?.removeAttribute('disabled');
    } else {
      document
        .getElementById('changeNumberInputEventBtn')
        ?.setAttribute('disabled', 'true');
    }
  }

  numberInputView(event: any) {
    const isValid = event.target.previousSibling.reportValidity();
    if (isValid) {
      this.receiveNumberText = event.target.previousSibling.value;
      this.senderNumberView = false;
      this.receiverNumberView = true;
    }
  }

  setNumberInputValue(e: any) {
    e.target.setAttribute('value', e.target.value);
  }

  hideNumberInputUserView() {
    this.senderNumberView = true;
    this.receiverNumberView = false;
  }

  changeEmailInputEvent(event: any) {
    if (event.target.value !== '') {
      document
        .getElementById('changeEmailInputEventBtn')
        ?.removeAttribute('disabled');
      event.target.setAttribute('value', event.target.value);
      this.receiveEmailText = event.target.value;
    } else {
      document
        .getElementById('changeEmailInputEventBtn')
        ?.setAttribute('disabled', 'true');
    }
  }

  emailInputView(event: any) {
    const isValid = event.target.previousSibling.reportValidity();
    if (isValid) {
      this.senderEmailView = false;
      this.receiverEmailView = true;
    }
  }

  hideEmailInputUserView() {
    this.senderEmailView = true;
    this.receiverEmailView = false;
  }

  changeURLInputEvent(event: any) {
    if (event.target.value !== '') {
      document
        .getElementById('changeURLInputEventBtn')
        ?.removeAttribute('disabled');
      event.target.setAttribute('value', event.target.value);
      this.receiveURLText = event.target.value;
    } else {
      document
        .getElementById('changeURLInputEventBtn')
        ?.setAttribute('disabled', 'true');
    }
  }

  URLInputView(event: any) {
    const isValid = event.target.previousSibling.reportValidity();
    if (isValid) {
      this.senderURLView = false;
      this.receiverURLView = true;
    }
  }

  hideURLInputUserView() {
    this.senderURLView = true;
    this.receiverURLView = false;
  }

  changeDateInputEvent(event: any) {
    if (event.target.value !== '') {
      document
        .getElementById('changeDateInputEventBtn')
        ?.removeAttribute('disabled');
      event.target.setAttribute('value', event.target.value);
      this.receiveDateText = event.target.value;
    } else {
      document
        .getElementById('changeDateInputEventBtn')
        ?.setAttribute('disabled', 'true');
    }
  }

  DateInputView(event: any) {
    this.senderDateView = false;
    this.receiverDateView = true;
  }

  hideDateInputUserView() {
    this.senderDateView = true;
    this.receiverDateView = false;
  }
}
