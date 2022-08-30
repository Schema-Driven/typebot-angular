import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-number-field',
  templateUrl: './number-field.component.html',
  styleUrls: ['./number-field.component.css']
})
export class NumberFieldComponent {

  @Input() label: string = '';
  @Input() value: string = '';
  @Output() updateObjectValue = new EventEmitter<string>();

  eventHandler(event: any) {
    this.updateObjectValue.emit(event.target.value);
  }


}
