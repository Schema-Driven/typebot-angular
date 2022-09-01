import { Component, OnInit } from '@angular/core';
import { EditorService } from '../../../services/editor.service';
import { countries } from '../country';

@Component({
  selector: 'app-editor-fields',
  templateUrl: './editor-fields.component.html',
  styleUrls: ['./editor-fields.component.css']
})
export class EditorFieldsComponent implements OnInit {

  block: any = {};
  fields: any = [];

  constructor(private editorService: EditorService) { }

  ngOnInit() {
    this.editorService.selectedBlock$.subscribe((block) => {
      this.block = block;
    });
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
        case 'email_input':
          this.setEmailInputFields(options);
        break;
        case'url_input':
          this.setEmailInputFields(options);
        break;
        case 'date_input':
          this.setDateInputFields(options);
        break;
        case 'phone_number_input':
          this.setPhoneInputFields(options);
        break;
        case 'rating_input':
          this.setRatingInputFields(options);
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
      { key: 'from', label: 'From label:', value: options.labels.from, type: 'text_input', dependent: { fieldName: 'isRange', fieldValue: true }},
      { key: 'to', label: 'To label:', value: options.labels.to, type: 'text_input', dependent: { fieldName: 'isRange', fieldValue: true }},
      { key: 'button', label: 'Button Label:', value: options.labels.button, type: 'text_input' },
    ]
  }

  setRatingInputFields(options: any) {
    let buttonTypes = [
      {label:options.buttonTypes.iconText, value:options.buttonTypes.iconText},
      {label:options.buttonTypes.numberText, value:options.buttonTypes.numberText}
    ]
    this.fields = [
      { key: 'length', label: 'Maximum:', value: Array(options.length).fill(0).map((x,i)=>i+3), type: 'dropdown'},
      { key: 'buttonTypes', label: 'Type:', value: buttonTypes, type: 'dropdown' },
      { key: 'notLikelyLabel', label: '0 label:', value: options.labels.notLikelyLabel, type: 'text_input'},
      { key: 'extremeLabel', label: '4 label:', value: options.labels.extremeLabel, type:'text_input' },
      { key: 'button', label: 'Button Label:', value: options.labels.button, type: 'text_input' },
    ]
  }

  setPhoneInputFields(options: any) {
    this.fields = [
      { key: 'placeholder', label: 'Placeholder:', value: options.labels.placeholder, type: 'text_input'},
      { key: 'button', label: 'Button Label:', value: options.labels.button, type: 'text_input' },
      { key: 'countries', label: 'Default country:', value: countries , type: 'dropdown' },
      { key: 'retryMessageContent', label: 'Retry message:', value: options.retryMessageContent, type: 'text_input' }
    ]
  }

}
