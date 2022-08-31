import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-dropdown-field',
  templateUrl: './dropdown-field.component.html',
  styleUrls: ['./dropdown-field.component.css']
})
export class DropdownFieldComponent{

  @Input() label: string = '';
  @Input() value: string = '';
  @Output() updateObjectValue = new EventEmitter<string>();

  eventHandler(event: any) {
    this.updateObjectValue.emit(event.target.value);
  }

}
