import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-text-field',
  templateUrl: './text-field.component.html',
  styleUrls: ['./text-field.component.css']
})
export class TextFieldComponent {

  @Input() label: string = '';
  @Input() value: string = '';
  @Output() updateObjectValue = new EventEmitter<string>();

  eventHandler(event: any) {
    this.updateObjectValue.emit(event.target.value);
  }
}
