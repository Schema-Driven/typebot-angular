import { Component, Input, OnInit } from '@angular/core';
import { EditorService } from '../../../../services/editor.service';

@Component({
  selector: 'app-date-field',
  templateUrl: './date-field.component.html',
  styleUrls: ['./date-field.component.css']
})
export class DateFieldComponent{

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
    this.block.options[this.key] = event.target.value;
    this.editorService.setBlock(this.block);
  }

}
