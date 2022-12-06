import { Component, Input, OnInit } from '@angular/core';
import { EditorService } from '../../../../services/editor.service';

@Component({
  selector: 'app-audio-field',
  templateUrl: './audio-field.component.html',
  styleUrls: ['./audio-field.component.css']
})
export class AudioFieldComponent implements OnInit {

  @Input() data: any = {};
  block: any = {};


  constructor(private editorService: EditorService) { }

  ngOnInit(): void {
    this.editorService.selectedBlock$.subscribe((block) => {
      this.block = block;
    });
  }

  eventHandler(event: any) {
    this.block.content['url'] = event.target.value;
    this.editorService.setBlock(this.block);
  }
  updateHeight(event: any) {
    this.block.content['height'] = event.target.value;
    this.editorService.setBlock(this.block);
  }

}
