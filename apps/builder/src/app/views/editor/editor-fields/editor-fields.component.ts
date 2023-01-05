import { Component, OnInit } from '@angular/core';
import { EditorService } from '../../../services/editor.service';
import { countries } from '../country';
import { currencies } from '../../editor/currency'

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
        case 'image':
          this.setImageBubbleField(this.block.content);
        break;
        case 'video':
          this.setVideoBubbleField(this.block.content);
        break;
        case 'embed':
          this.setEmbedBubbleField(this.block.content);
        break;
        case 'audio':
          this.setAudioBubbleField(this.block.content);
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
        case 'file_input':
          this.setFileInputFields(this.block.options);
        break;
        case 'payment_input':
          this.setPaymentInputField(this.block.options);
        break;
      }
    }
  }

  setTextField(content: any) {
    this.fields = [
      { key: 'html', parentKey: '', value: content.html, type: 'textarea' }
    ]
  }

  setImageBubbleField(content: any) {
    this.fields = [
      { key: 'url', parentKey: '', value: content.url, type: 'image' }
    ]
  }

  setVideoBubbleField(content: any) {
    this.fields = [
      { key: 'url', parentKey: '', value: content.url, type: 'video' }
    ]
  }

  setEmbedBubbleField(content: any) {
    this.fields = [
      { key: 'url', parentKey: '', value: content.url, height:content.height , type: 'embed' },
      // { key: 'height', parentKey: '', value: content.height, type: 'embed' }
    ]
  }

  setAudioBubbleField(content: any) {
    this.fields = [
      { key: 'url', parentKey: '', value: content.url , type: 'audio' },
    ]
  }

  setTextInputFields(options: any) {
    this.fields = [
      { key: 'isLong', parentKey: '', label: 'Long Text?', value: options.isLong, type: 'radio' },
      { key: 'placeholder', parentKey: 'labels', label: 'Placeholder:', value: options.labels.placeholder, type: 'text_input'},
      { key: 'button', parentKey: 'labels', label: 'Button Label:', value: options.labels.button, type: 'text_input' }
    ]
  }

  setEmailInputFields(options: any) {
    this.fields = [
      { key: 'placeholder', parentKey: 'labels', label: 'Placeholder:', value: options.labels.placeholder, type: 'text_input'},
      { key: 'button', parentKey: 'labels', label: 'Button Label:', value: options.labels.button, type: 'text_input' },
      { key: 'retryMessageContent', parentKey: '', label: 'Retry message:', value: options.retryMessageContent, type: 'text_input' }
    ]
  }

  setNumberInputFields(options: any) {
    this.fields = [
      { key: 'placeholder', parentKey: 'labels', label: 'Placeholder:', value: options.labels.placeholder, type: 'text_input'},
      { key: 'button', parentKey: 'labels', label: 'Button Label:', value: options.labels.button, type: 'text_input' },
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
      { key: 'placeholder', parentKey: 'labels', label: 'Placeholder:', value: options.labels.placeholder, type: 'text_input'},
      { key: 'button', parentKey: 'labels', label: 'Button Label:', value: options.labels.button, type: 'text_input' },
      { key: 'defaultCountryCode', parentKey: '', label: 'Default country:', value: countries , type: 'dropdown' },
      { key: 'retryMessageContent', parentKey: '', label: 'Retry message:', value: options.retryMessageContent, type: 'text_input' }
    ]
  }

  setChoiceInputFields(options: any) {
    this.fields = [
      { key: 'isMultipleChoice', parentKey: '', label: 'Multiple choice?', value: options.isMultipleChoice, type: 'radio' },
      { key: 'buttonLabel', parentKey: '', label: 'Button Label:', value: options.buttonLabel, type: 'text_input' ,  dependent: { key: 'isMultipleChoice', parentKey: '', value: true }},
    ]
  }

  setPaymentInputField(options:any){
    this.fields = [
      { key: "paymentProvider", parentKey: '', label: 'Provider:', value: 'Stripe', dropDownValue:'Stripe' , type: 'select' },
      { key: 'paymentProvider', parentKey: '', label: 'Account:', value: 'Select an account', dropDownValue:'+ Connect New' , type: 'select' },
      { key: 'paymentProvider', parentKey: '', label: 'Price amount:', value: 30.00 , type: 'text_input' },
      { key: 'paymentProvider', parentKey: '', label: 'Currency:', value: currencies , type: 'dropdown' },
      { key: 'button', parentKey: 'labels', label: 'Button Label:', value: options.labels.button, type: 'text_input' },
      { key: 'successMessage', parentKey: '', label: 'Success message:', value: options.labels.success, type: 'text_input' }
    ]
  }

  setFileInputFields(options: any) {
    this.fields = [
      { key: 'isRequired', parentKey: '', label: 'Required?', value: options.isRequired, type: 'radio' },
      { key: 'isMultipleAllowed', parentKey: '', label: 'Allow multiple files?', value: options.isMultipleAllowed, type: 'radio' },
      { key: 'sizeLimit', parentKey: '', label: 'Size limit (MB)', value: options.sizeLimit, type: 'number_input' },
      { key: 'placeholder', parentKey: 'labels', label: 'Placeholder:', value: options.labels.placeholder, type: 'file_input'},
      { key: 'button', parentKey: 'labels', label: 'Button Label:', value: options.labels.button, type: 'text_input'},
    ]
  }



}
