import { Component, Input, OnInit } from '@angular/core';
import { EditorService } from '../../../../services/editor.service';

@Component({
  selector: 'app-textarea-field',
  templateUrl: './textarea-field.component.html',
  styleUrls: ['./textarea-field.component.css']
})
export class TextareaFieldComponent implements OnInit {

  @Input() data: any = {};
  block: any = {};
  isShow = true;

  constructor(private editorService: EditorService) { }

  ngOnInit() {
    this.editorService.selectedBlock$.subscribe((block) => {
      this.block = block;
    });
  }

  eventHandler(event: any) {
    if (this.data.parentKey) {
      this.block.options[this.data.parentKey][this.data.key] = event.target.value;
    } else {
      this.block.options.labels[this.data.key] = event.target.value;
    }

    this.editorService.setBlock(this.block);
  }

}
