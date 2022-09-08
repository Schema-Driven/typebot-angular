import { Component, Input, OnInit } from '@angular/core';
import { prefilledData, uuid } from '../editor';

@Component({
  selector: 'app-block',
  templateUrl: './block.component.html',
  styleUrls: ['./block.component.css']
})
export class BlockComponent implements OnInit {

  prefilledData: any;
  @Input() block: any = {};

  constructor() { }

  ngOnInit(): void {
    this.prefilledData = prefilledData;
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

  pushMultiInput(block: any,event:any) {
    event.stopPropagation();
    block.items.push({
      id: uuid(),
      blockId: block.id,
      content: "Click to edit",
      type: 0
    })
  }

}
