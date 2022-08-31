import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-date-field',
  templateUrl: './date-field.component.html',
  styleUrls: ['./date-field.component.css']
})
export class DateFieldComponent{

  @Input() label: string = '';
  @Input() value: string = '';
  @Output() updateObjectValue = new EventEmitter<string>();

  eventHandler(event: any) {
    this.updateObjectValue.emit(event.target.value);
  }

}
