import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { prefilledData, uuid } from '../editor';

@Component({
  selector: 'app-block',
  templateUrl: './block.component.html',
  styleUrls: ['./block.component.css']
})
export class BlockComponent implements OnInit {

  prefilledData: any;
  @Input() block: any = {};
  @Output() addEndpointToItem = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
    this.prefilledData = prefilledData;

    if (this.block.type === 'choice_input') {
      this.addItem();
    }
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
    this.addEndpointToItem.emit(itemId)
  }

  onItemInput(index: number, event: any) {
    this.block.items[index].content = event.target.value;
  }

  showRightClickPopover(type: string, id: string, e:any) {
    // if (this.firstGroupId !== id && this.firstBlockId !== id) {
    //   id = type + '-' + id;
    //   if (document.getElementById(id)) {
    //     let index = document.getElementById(id)?.getAttribute('data-popover-index');
    //     this.rightClickPopovers[type].splice(index, 1);
    //   }

    //   this.rightClickPopovers[type].push({
    //     position: { x: e.clientX, y: e.clientY },
    //     type: type,
    //     id: id,
    //   });
    //   return false;
    // }
    // return true;
  }

}
