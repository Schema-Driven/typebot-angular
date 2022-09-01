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
  @Input() dependent: any = {};
  isShow = true;
  block: any = {};

  constructor(private editorService: EditorService) { }

  ngOnInit() {
    this.editorService.selectedBlock$.subscribe((block) => {
      this.block = block;
    });

    if (this.dependent) {
      this.isShow = false;
    }

    if(this.value){
      console.log(this.value);
    }
  }

  eventHandler(event: any) {
    this.block.options[this.key] = event.target.checked;
    this.editorService.setBlock(this.block);
    // (document.getElementById(this.block.id) as HTMLElement).style.height = '150px';
  }

}
