import { Component, Input, OnInit } from '@angular/core';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { ChangeEvent } from '@ckeditor/ckeditor5-angular/ckeditor.component';
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
  public Editor = ClassicEditor;

  constructor(private editorService: EditorService) { }

  ngOnInit() {
    this.editorService.selectedBlock$.subscribe((block) => {
      this.block = block;
    });
  }

  eventHandler({ editor }: ChangeEvent) {
    const content = editor.getData();
    const plainData = content.replace( /(<([^>]+)>)/ig, '' );

    this.block.content[this.data.key] = content;
    this.block.content['plainText'] = plainData;

    this.editorService.setBlock(this.block);
  }

}
