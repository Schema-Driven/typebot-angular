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
    if (this.block) {
      switch(this.block.type) {
        case 'text':
          this.setTextField(this.block.content);
        break;
        case 'text_input':
          this.setTextInputFields(this.block.options);
        break;
        case 'number_input':
          this.setNumberInputFields(this.block.options);
        break;
        case 'email_input':
        case'url_input':
          this.setEmailInputFields(this.block.options);
        break;
        case 'date_input':
          this.setDateInputFields(this.block.options);
        break;
        case 'phone_number_input':
          this.setPhoneInputFields(this.block.options);
        break;
        case 'rating_input':
          this.setRatingInputFields(this.block.options);
        break;
        case 'choice_input':
          this.setChoiceInputFields(this.block.options);
        break;
      }
    }
  }

  setTextField(content: any) {
    this.fields = [
      { key: 'html', parentKey: 'content', value: content.html, type: 'textarea' }
    ]
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
      { key: 'isRange', parentKey: '', label: 'Is range?', value: options.isRange, type: 'radio' },
      { key: 'hasTime', parentKey: '', label: 'With time?', value: options.hasTime, type: 'radio' },
      { key: 'from', parentKey: 'labels', label: 'From label:', value: options.labels.from, type: 'text_input', dependent: { key: 'isRange', parentKey: '', value: true }},
      { key: 'to', parentKey: 'labels', label: 'To label:', value: options.labels.to, type: 'text_input', dependent: { key: 'isRange', parentKey: '', value: true }},
      { key: 'button', parentKey: 'labels', label: 'Button Label:', value: options.labels.button, type: 'text_input' },
    ]
  }

  setRatingInputFields(options: any) {
    let maximumValues = Array(8).fill(0).map((x, i)=> {
      return { label: i+3, value: i+3}
    });

    let buttonTypes = [
      { label: 'Icons', value: 'Icons' },
      { label: 'Numbers', value: 'Numbers'}
    ];

    this.fields = [
      { key: 'length', parentKey: '', label: 'Maximum:', value: maximumValues, type: 'dropdown'},
      { key: 'buttonTypes', parentKey: '', label: 'Type:', value: buttonTypes, type: 'dropdown'},
      { key: 'isEnabled', parentKey: 'customIcon', label: 'Custom icon?', value: options.customIcon.isEnabled, dependent: { key: 'buttonTypes', parentKey: '', value: 'Icons' }, type: 'radio' },
      { key: 'svg', parentKey: 'customIcon', label: 'Icon SVG:', value: options.customIcon.svg, placeholder: '<svg>...</svg>', dependent: { key: 'isEnabled', parentKey: 'customIcon', value: true }, type: 'text_input' },
      { key: 'left', parentKey: 'labels', label: '0 label:', value: options.labels.left, placeholder: 'Not likely at all', type: 'text_input'},
      { key: 'right', parentKey: 'labels', label: '4 label:', value: options.labels.right, placeholder: 'Extremely likely', type:'text_input' },
      { key: 'button', parentKey: 'labels', label: 'Button Label:', value: options.labels.button, type: 'text_input' },
    ];
  }

  setPhoneInputFields(options: any) {
    this.fields = [
      { key: 'placeholder', label: 'Placeholder:', value: options.labels.placeholder, type: 'text_input'},
      { key: 'button', label: 'Button Label:', value: options.labels.button, type: 'text_input' },
      { key: 'defaultCountryCode', label: 'Default country:', value: countries , type: 'dropdown' },
      { key: 'retryMessageContent', label: 'Retry message:', value: options.retryMessageContent, type: 'text_input' }
    ]
  }

  setChoiceInputFields(options: any) {
    this.fields = [
      { key: 'isMultipleChoice', label: 'Multiple choice?', value: options.isMultipleChoice, type: 'radio' },
      { key: 'button', label: 'Button Label:', value: options.buttonLabel, type: 'text_input' ,  dependent: { fieldName: 'isMultipleChoice', fieldValue: true }},
    ]
  }

}
