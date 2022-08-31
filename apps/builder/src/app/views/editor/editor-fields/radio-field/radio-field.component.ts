import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';

@Component({
  selector: 'app-radio-field',
  templateUrl: './radio-field.component.html',
  styleUrls: ['./radio-field.component.css']
})
export class RadioFieldComponent implements OnInit {

  @Input() key: string = '';
  @Input() label: string = '';
  @Input() value: string = '';

  @Output() updateObjectValue = new EventEmitter<any>();

  ngOnInit() { }

  eventHandler(event: any) {
    let eventValue = event.target.value == 'on' ? true : false;
    this.updateObjectValue.emit(eventValue);
    return true;
  }

}
