import { Component, Input, OnInit } from '@angular/core';
import { EditorService } from '../../../../services/editor.service';

@Component({
  selector: 'app-radio-field',
  templateUrl: './radio-field.component.html',
  styleUrls: ['./radio-field.component.css']
})
export class RadioFieldComponent implements OnInit {

  @Input() key: string = '';
  @Input() label: string = '';
  @Input() value: string = '';
  block: any = {};

  constructor(private editorService: EditorService) { }

  ngOnInit() {
    this.editorService.selectedBlock$.subscribe((block) => {
      this.block = block;
    });
  }

  eventHandler(event: any) {
    let eventValue = event.target.value == 'on' ? true : false;
    this.block.options[this.key] = eventValue;
    this.editorService.setBlock(this.block);
  }

}
