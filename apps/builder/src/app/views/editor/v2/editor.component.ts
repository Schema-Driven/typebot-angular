import { Component } from '@angular/core';
import { CdkDrag, CdkDragDrop, moveItemInArray, transferArrayItem, copyArrayItem } from '@angular/cdk/drag-drop';
import { GroupStructuredBlock } from './editor.interfaces';


@Component({
  selector: 'editorv2',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css'],
})

export class Editorv2Component {

  structuredBlocks: GroupStructuredBlock[] = [
    {
      uuid: this.uuid(),
      name: 'bubbles',
      blocks: [
        {
          id: parseFloat((Math.random() * 10000000).toFixed(0)),
          uuid: this.uuid(),
          name: 'Text',
          position: {
            x: 320,
            y: 120,
          },
          svg: `assets/svgs/text.svg`,
        },
        {
          id: parseFloat((Math.random() * 10000000).toFixed(0)),
          uuid: this.uuid(),
          name: 'Image',
          position: {
            x: 320,
            y: 120,
          },
          svg: `assets/svgs/image.svg`,
        },
      ],
    }
  ];

  todo = ['Get to work', 'Pick up groceries', 'Go home', 'Fall asleep'];

  done = ['Get up', 'Brush teeth', 'Take a shower', 'Check e-mail', 'Walk dog'];

  fixeditems = [
    {
      uuid: '123',
      name: 'bubbles',
      blocks: ['Haroon', 'Ali']
    },
    {
      uuid: '324',
      name: 'inputs',
      blocks: ['Zia', 'Waqas']
    }
  ]

  groupblock = [
    {
      name: "Block 1",
      blocks: ['Get to work', 'Pick up groceries', 'Go home', 'Fall asleep'],
    },
    {
      name: "Block 2",
      blocks: ['Get up', 'Brush teeth', 'Take a shower', 'Check e-mail', 'Walk dog'],
    }
  ]

  public uuid() {
    var d = new Date().getTime(); //Timestamp
    var d2 =
      (typeof performance !== 'undefined' &&
        performance.now &&
        performance.now() * 1000) ||
      0; //Time in microseconds since page-load or 0 if unsupported
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(
      /[xy]/g,
      function (c) {
        var r = Math.random() * 16; //random number between 0 and 16
        if (d > 0) {
          //Use timestamp until depleted
          r = (d + r) % 16 | 0;
          d = Math.floor(d / 16);
        } else {
          //Use microseconds since page-load if supported
          r = (d2 + r) % 16 | 0;
          d2 = Math.floor(d2 / 16);
        }
        return (c === 'x' ? r : (r & 0x3) | 0x8).toString(16);
      }
    );
  }

  drop(event: CdkDragDrop<string[]>, container: string) {
    console.log("event", event);
    console.log("container", container);
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else if ( event.previousContainer.id === "fixed-list" && event.container.id === "receiving-list" ) {
      copyArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    } else if ( event.previousContainer.id === "fixed-list" ) {
      this.addNewContainer(event.previousContainer.data[event.previousIndex]);
    } else if ( container === "container") {
      this.addNewContainer(event.previousContainer.data[event.previousIndex]);
      event.previousContainer.data.splice(event.previousIndex,1);
    } else {
      console.log("event.container.data", event.container.data)
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );

      if (event.previousContainer.data.length == 0) {
        this.groupblock = this.groupblock.filter(
          (gb) => gb.blocks.length > 0
        );
      }
    }
  }

  addNewContainer(newGroup: any) {
    this.groupblock.push({
      name: "Block " + (this.groupblock.length + 1),
      blocks: [newGroup]
    });
  }

  /** Predicate function that doesn't allow items to be dropped into a list. */
  noReturnPredicate() {
    return false;
  }

  allowDrag(event: CdkDrag<number>, container: string) {
    return false;
  }
}
