import { Component, Input, OnInit } from '@angular/core';
import { EditorService } from '../../../../services/editor.service';

@Component({
  selector: 'app-radio-field',
  templateUrl: './radio-field.component.html',
  styleUrls: ['./radio-field.component.css']
})
export class RadioFieldComponent implements OnInit {

  @Input() data: any = {};
  isShow = true;
  block: any = {};

  constructor(private editorService: EditorService) { }

  ngOnInit() {
    this.editorService.selectedBlock$.subscribe((block) => {
      this.block = block;
    });

    if (this.data.dependent) {
      this.isShow = false;
    }

    if(this.value){
      console.log(this.value);
    }
  }

  eventHandler(event: any) {
    if (this.data.parentKey) {
      this.block.options[this.data.parentKey][this.data.key] = event.target.checked;
    } else {
      this.block.options[this.data.key] = event.target.checked;
    }
    this.editorService.setBlock(this.block);
    // (document.getElementById(this.block.id) as HTMLElement).style.height = '150px';
  }

}
