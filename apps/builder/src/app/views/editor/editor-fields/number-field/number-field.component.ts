import { Component, Input } from '@angular/core';
import { EditorService } from '../../../../services/editor.service';

@Component({
  selector: 'app-number-field',
  templateUrl: './number-field.component.html',
  styleUrls: ['./number-field.component.css']
})
export class NumberFieldComponent {

  @Input() key: string = '';
  @Input() label: string = '';
  @Input() value: string = '';
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
