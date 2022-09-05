import { Component, Input, OnInit } from '@angular/core';
import { EditorService } from '../../../../services/editor.service';

@Component({
  selector: 'app-dropdown-field',
  templateUrl: './dropdown-field.component.html',
  styleUrls: ['./dropdown-field.component.css']
})
export class DropdownFieldComponent{

  @Input() data: any = {};
  block: any = {};
  isShow: boolean = true;

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
      this.block.options[this.data.key] = event.target.value;
    }
    this.editorService.setBlock(this.block);
  }

}
