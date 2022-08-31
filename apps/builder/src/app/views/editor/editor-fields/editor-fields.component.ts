import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { EditorService } from '../../../services/editor.service';

@Component({
  selector: 'app-editor-fields',
  templateUrl: './editor-fields.component.html',
  styleUrls: ['./editor-fields.component.css']
})
export class EditorFieldsComponent implements OnInit {

  @Output() updatedBlock = new EventEmitter<string>();
  block: any = {};
  fields: any = [];

  constructor(private editorService: EditorService) { }

  ngOnInit(): void {
    // this.currentBlock = this.block;
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
        case 'date_input':
          this.setDateInputFields(options);
        break;
        case 'rating_input':
          this.setRatingInputFields(options);
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
      { key: 'placeholder', label: 'From label:', value: options.labels.from, type: 'text_input', dependent: { fieldName: 'isRange', fieldValue: true }},
      { key: 'button', label: 'Button Label:', value: options.labels.button, type: 'text_input' },
    ]
  }

  setRatingInputFields(options: any) {
    let buttonTypes = [
      options.buttonTypes.iconText,
      options.buttonTypes.numberText
    ]
    this.fields = [
      { key: 'length', label: 'Maximum:', value: Array(options.length).fill(0).map((x,i)=>i+3), type: 'dropdown'},
      { key: 'buttonTypes', label: 'Type:', value: buttonTypes, type: 'dropdown' },
      { key: 'notLikelyLabel', label: '0 label:', value: options.labels.notLikelyLabel, type: 'text_input'},
      { key: 'extremeLabel', label: '4 label:', value: options.labels.extremeLabel, type:'text_input' },
      { key: 'button', label: 'Button Label:', value: options.labels.button, type: 'text_input' },
    ]
  }

  updateObject(value: string, key: string) {
    if (this.block.options.labels.hasOwnProperty(key)) {
      this.block.options.labels[key] = value;
    } else {
      this.block.options[key] = value;
    }
    // this.currentBlock = this.block;
    this.editorService.setBlock(this.block);
    // this.updatedBlock.emit(this.block);
    return true;
  }

}
