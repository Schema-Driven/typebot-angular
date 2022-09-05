import { Component, Input, OnInit } from '@angular/core';
import { EditorService } from '../../../../services/editor.service';

@Component({
  selector: 'app-text-field',
  templateUrl: './text-field.component.html',
  styleUrls: ['./text-field.component.css']
})
export class TextFieldComponent implements OnInit {

  @Input() data: any = {};
  block: any = {};
  isShow = true;

  constructor(private editorService: EditorService) { }

  ngOnInit() {
    this.editorService.selectedBlock$.subscribe((block) => {
      this.block = block;
    });

    if (this.data.dependent) {
      this.isShow = false;
    }
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
