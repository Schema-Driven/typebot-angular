import { Component, Input, OnInit } from '@angular/core';
import { EditorService } from '../../../../services/editor.service';

@Component({
  selector: 'app-video-field',
  templateUrl: './video-field.component.html',
  styleUrls: ['./video-field.component.css']
})
export class VideoFieldComponent implements OnInit {

  @Input() data: any = {};
  block: any = {};

  constructor(private editorService: EditorService) { }

  ngOnInit(): void {
    this.editorService.selectedBlock$.subscribe((block) => {
      this.block = block;
    });
  }


  youtubeURLParser(url: string) {
    var regExp = /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    var match = url.match(regExp);
    if (match && match[2].length == 11) {
      return match[2];
    } else {
      return '';
    }
  }

  eventHandler(event: any) {
    let videoId = this.youtubeURLParser(event.target.value);
    this.block.content['id'] = 'https://www.youtube.com/embed/' + videoId;
    this.block.content['type'] = 'youtube';
    this.block.content['url'] = event.target.value;
    this.editorService.setBlock(this.block);
  }

}
