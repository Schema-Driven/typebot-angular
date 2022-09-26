import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { EditorService } from '../../../services/editor.service';
import { prefilledData, uuid } from '../editor';

@Component({
  selector: 'app-block',
  templateUrl: './block.component.html',
  styleUrls: ['./block.component.css']
})
export class BlockComponent implements OnInit {

  prefilledData: any;
  // behaviourBlock: any;
  @Input() block: any = {};
  @Input() isLastBlock: boolean = false;
  @Output() manageItemEndpoints = new EventEmitter();
  @Output() onItemRightClick = new EventEmitter();

  constructor(private editorService: EditorService) { }

  ngOnInit(): void {
    this.editorService.selectedBlock$.subscribe((b) => {
      // this.behaviourBlock = b;

      if (b.type === 'choice_input') {
        this.onMultipleChoiceChange(b);
      }
    });

    this.prefilledData = prefilledData;

    if (this.block.type === 'choice_input' && this.block?.items?.length === 0) {
      this.addItem();
    }
  }

  onMultipleChoiceChange(b: any) {
    let itemIds: any = [];
    b.items.forEach((element: any) => {
      itemIds.push('item-' + element.id)
    });

    this.manageItemEndpoints.emit({itemIds, action: (b.options.isMultipleChoice ? 'remove' : 'add')});
  }

  addItem(event: any = '') {
    if (event) {
      event.stopPropagation();
    }

    let itemId = uuid();
    this.block.items.push({
      id: itemId,
      blockId: this.block.id,
      content: "Click to edit",
      type: 0
    });

    this.manageItemEndpoints.emit({itemIds: ['item-' + itemId], action: 'add'});
  }

  onItemInput(index: number, event: any) {
    this.block.items[index].content = event.target.value;
  }

  showRightClickPopover(type: string, id: string, e:any) {
    e.stopPropagation();
    this.onItemRightClick.emit({
      e: { clientX: e.clientX, clientY: e.clientY },
      type,
      id,
    });
    return false;
  }

}
