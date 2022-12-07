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
  isTab = 1;
  localUrl: any;


  constructor(private editorService: EditorService) { }

  ngOnInit(): void {
    this.editorService.selectedBlock$.subscribe((block) => {
      this.block = block;
    });
  }

  eventHandler(event: any) {
    this.block.content[this.data.key] = event.target.value;
    this.editorService.setBlock(this.block);
  }

  chooseVideoHandler(event: any) {
    const maxAllowedSize = 4 * 1024 * 1024;
      if (event.target.files && event.target.files[0]) {
        var reader = new FileReader();
        reader.onload = (event: any) => {
            this.localUrl = event.target.result;
            this.block.content[this.data.key] = this.localUrl;
            this.editorService.setBlock(this.block);
          }
        if(event.target.files[0].size < maxAllowedSize){
          reader.readAsDataURL(event.target.files[0]);
        }
        else{
          alert('Maximum audio file size allowed is 4MB')
        }
      }
    }
}

