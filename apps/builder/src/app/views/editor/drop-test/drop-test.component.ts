import {Component} from '@angular/core';
import {CdkDrag, CdkDragDrop, moveItemInArray, transferArrayItem, copyArrayItem} from '@angular/cdk/drag-drop';

/**
 * @title Drag&Drop connected sorting
 */
@Component({
  selector: 'drop-test',
  templateUrl: './drop-test.html',
  styleUrls: ['./drop-test.scss'],
})
export class DropTestComponent {
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
