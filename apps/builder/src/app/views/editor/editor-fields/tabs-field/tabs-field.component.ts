import { Component, Input, OnInit } from '@angular/core';
import { EditorService } from '../../../../services/editor.service';

@Component({
  selector: 'app-tabs-field',
  templateUrl: './tabs-field.component.html',
  styleUrls: ['./tabs-field.component.css'],
})
export class TabsFieldComponent implements OnInit {
  @Input() data: any = {};
  block: any = {};
  isTab = 1;
  localUrl: any;

  constructor(private editorService: EditorService) {}

  ngOnInit() {
    this.editorService.selectedBlock$.subscribe((block) => {
      this.block = block;
    });
  }

  eventHandler(event: any) {
    this.block.content[this.data.key] = event.target.value;
    this.editorService.setBlock(this.block);
  }

  chooseImageHandler(event: any) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      reader.onload = (event: any) => {
        this.localUrl = event.target.result;
        this.block.content[this.data.key] = this.localUrl;
        this.editorService.setBlock(this.block);
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  }
}
