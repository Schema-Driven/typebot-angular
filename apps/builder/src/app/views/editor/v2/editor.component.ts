import { Component } from '@angular/core';
import {
  CdkDrag,
  CdkDragDrop,
  CdkDropList,
  moveItemInArray,
  transferArrayItem,
  copyArrayItem,
} from '@angular/cdk/drag-drop';
import { GroupBlock, Block } from './editor.interfaces';
import { StructuredBlocks } from './group-structured-blocks';

@Component({
  selector: 'editorv2',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css'],
})
export class Editorv2Component extends StructuredBlocks {
  deg: number = 3;
  sidePanel: boolean = false;
  sidePanelClick() {
    console.log('Side Panel Click', this.sidePanel);
    this.sidePanel = !this.sidePanel;
  }

  groupBlocks: GroupBlock[] = [
    {
      id: parseFloat((Math.random() * 10000000).toFixed(0)),
      uuid: this.uuid(),
      name: 'Start',
      position: {
        x: 420,
        y: 120,
      },
      draggable: true,
      blocks: [
        {
          id: 0,
          uuid: this.uuid(),
          name: 'Start',
          position: {
            x: 420,
            y: 120,
          },
          rendered: true,
          svg: `assets/svgs/text.svg`,
        },
      ],
    },
  ];

  drop(event: CdkDragDrop<Block[]>, container: string) {
    console.log('event', event);
    console.log('container', container);
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else if (
      event.previousContainer.id === 'fixed-list' &&
      event.container.id === 'receiving-list'
    ) {
      copyArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else if (event.previousContainer.id === 'fixed-list') {
      this.addNewContainer(
        event.previousContainer.data[event.previousIndex],
        event
      );
    } else if (container === 'container') {
      this.addNewContainer(
        event.previousContainer.data[event.previousIndex],
        event
      );
      event.previousContainer.data.splice(event.previousIndex, 1);
      this.removeEmptyGroupBlocks(event);
    } else {
      console.log('event.container.data', event.container.data);
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );

      this.removeEmptyGroupBlocks(event);
    }
  }

  addNewContainer(newGroup: any, event: any) {
    this.groupBlocks.push({
      id: parseFloat((Math.random() * 10000000).toFixed(0)),
      uuid: this.uuid(),
      name: `Group # ${this.groupBlocks.length + 1}`,
      position: {
        x: event.dropPoint.x,
        y: event.dropPoint.y,
      },
      draggable: true,
      blocks: [newGroup],
    });
  }

  removeEmptyGroupBlocks(event: any) {
    if (event.previousContainer.data.length == 0) {
      this.groupBlocks = this.groupBlocks.filter((gb) => gb.blocks.length > 0);
    }
  }

  /** Predicate function that doesn't allow items to be dropped into a list. */
  noReturnPredicate() {
    return false;
  }

  canDrop(item: CdkDrag, list: CdkDropList) {
    // console.log(list.getSortedItems().length)
    // return list && list.getSortedItems().length && list.getSortedItems().length > 0;
  }

  dropListEnterPredicate(b: any) {
    return function (drag: CdkDrag, drop: CdkDropList) {
      return b.name !== 'Start';
    };
  }

  // Emits when the user starts dragging the item.
  cdkDragStarted(event: any) {
    event.source._dragRef._initialTransform = `rotate(${this.deg}deg)`;
  }
}
