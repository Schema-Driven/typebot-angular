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
  @Input() dependent: any = {};
  block: any = {};
  isShow: boolean = true;

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
    this.block.options[this.key] = event.target.value;
    this.editorService.setBlock(this.block);
  }

}
