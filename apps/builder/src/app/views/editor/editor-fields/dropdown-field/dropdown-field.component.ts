import { Component, Input, OnInit } from '@angular/core';
import { EditorService } from '../../../../services/editor.service';

@Component({
  selector: 'app-dropdown-field',
  templateUrl: './dropdown-field.component.html',
  styleUrls: ['./dropdown-field.component.css']
})
export class DropdownFieldComponent{

  @Input() key: string = '';
  @Input() label: string = '';
  @Input() value: any = '';
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
