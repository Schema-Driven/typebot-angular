import { Component, Input, OnInit } from '@angular/core';
import { EditorService } from '../../../../services/editor.service';

@Component({
  selector: 'app-text-field',
  templateUrl: './text-field.component.html',
  styleUrls: ['./text-field.component.css']
})
export class TextFieldComponent implements OnInit {

  @Input() key: string = '';
  @Input() label: string = '';
  @Input() value: string = '';
  @Input() dependent: any = {};
  block: any = {};
  isShow = true;

  constructor(private editorService: EditorService) { }

  ngOnInit() {
    this.editorService.selectedBlock$.subscribe((block) => {
      this.block = block;
    });

    if (this.dependent) {
      this.isShow = false;
    }
  }

  eventHandler(event: any) {
    this.block.options.labels[this.key] = event.target.value;
    this.editorService.setBlock(this.block);
  }
}
