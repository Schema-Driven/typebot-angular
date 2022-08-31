import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-editor-fields',
  templateUrl: './editor-fields.component.html',
  styleUrls: ['./editor-fields.component.css']
})
export class EditorFieldsComponent implements OnInit {

  @Input() block: any = {};
  @Output() updatedBlock = new EventEmitter<string>();
  fields: any = [];

  constructor() { }

  ngOnInit(): void {
    this.setFields();
  }

  setFields() {
    if (this.block?.options) {
      let options = this.block.options;
      switch(this.block.type) {
        case 'text_input':
          this.setTextInputFields(options);
        break;
        case 'number_input':
          this.setNumberInputFields(options);
        break;
        case 'date_input':
          this.setDateInputFields(options);
        break;
        case 'email_input':
        case'url_input':
          this.setEmailInputFields(options);
        break;
      }
    }
  }

  setTextInputFields(options: any) {
    this.fields = [
      { key: 'isLong', label: 'Long Text?', value: options.isLong, type: 'radio' },
      { key: 'placeholder', label: 'Placeholder:', value: options.labels.placeholder, type: 'text_input'},
      { key: 'button', label: 'Button Label:', value: options.labels.button, type: 'text_input' }
    ]
  }

  setEmailInputFields(options: any) {
    this.fields = [
      { key: 'placeholder', label: 'Placeholder:', value: options.labels.placeholder, type: 'text_input'},
      { key: 'button', label: 'Button Label:', value: options.labels.button, type: 'text_input' },
      { key: 'retryMessageContent', label: 'Retry message:', value: options.retryMessageContent, type: 'text_input' }
    ]
  }

  setNumberInputFields(options: any) {
    this.fields = [
      { key: 'placeholder', label: 'Placeholder:', value: options.labels.placeholder, type: 'text_input'},
      { key: 'button', label: 'Button Label:', value: options.labels.button, type: 'text_input' },
      { key: 'min', label: 'Min', value: options.min, type: 'number_input' },
      { key: 'max', label: 'Max', value: options.max, type: 'number_input' },
      { key: 'step', label: 'Step', value: options.step, type: 'number_input' }
    ]
  }

  setDateInputFields(options: any) {
    this.fields = [
      { key: 'isRange', label: 'Is range?', value: options.isRange, type: 'radio' },
      { key: 'hasTime', label: 'With time?', value: options.hasTime, type: 'radio' },
      { key: 'button', label: 'Button Label:', value: options.labels.button, type: 'text_input' },
    ]
  }

  updateObject(value: string, key: string) {
    if (this.block.options.labels.hasOwnProperty(key)) {
      this.block.options.labels[key] = value;
    } else {
      this.block.options[key] = value;
    }
    this.updatedBlock.emit(this.block);
    return true;
  }

}
