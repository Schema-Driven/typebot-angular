import { Component, Input, OnInit } from '@angular/core';
import { EditorService } from '../../../../services/editor.service';

@Component({
  selector: 'app-tabs-field',
  templateUrl: './tabs-field.component.html',
  styleUrls: ['./tabs-field.component.css']
})
export class TabsFieldComponent implements OnInit {


  @Input() data: any = {};
  block: any = {};
  isUpload = true;
  isEmbed = false;
  isGiph = false;

  constructor(private editorService: EditorService) { }

  ngOnInit() {
    this.editorService.selectedBlock$.subscribe((block) => {
      this.block = block;
    });

    // if (this.data.dependent) {
    //   this.isShow = false;
    // }
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
