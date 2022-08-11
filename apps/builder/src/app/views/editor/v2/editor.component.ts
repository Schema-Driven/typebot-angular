import { Component } from '@angular/core';
import { CdkDrag, CdkDragDrop, moveItemInArray, transferArrayItem, copyArrayItem } from '@angular/cdk/drag-drop';
import { GroupStructuredBlock, GroupBlock, Block } from './editor.interfaces';

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
        {
          id: parseFloat((Math.random() * 10000000).toFixed(0)),
          uuid: this.uuid(),
          name: 'Video',
          position: {
            x: 320,
            y: 120,
          },
          svg: `assets/svgs/video.svg`,
        },
        {
          id: parseFloat((Math.random() * 10000000).toFixed(0)),
          uuid: this.uuid(),
          name: 'Embed',
          position: {
            x: 320,
            y: 120,
          },
          svg: `assets/svgs/embed.svg`,
        },
      ],
    },
    {
      uuid: this.uuid(),
      name: 'inputs',
      blocks: [
        {
          id: parseFloat((Math.random() * 10000000).toFixed(0)),
          uuid: this.uuid(),
          name: 'Text',
          position: {
            x: 320,
            y: 120,
          },
          svg: `assets/svgs/input-text.svg`,
        },
        {
          id: parseFloat((Math.random() * 10000000).toFixed(0)),
          uuid: this.uuid(),
          name: 'Number',
          position: {
            x: 320,
            y: 120,
          },
          svg: `assets/svgs/input-number.svg`,
        },
        {
          id: parseFloat((Math.random() * 10000000).toFixed(0)),
          uuid: this.uuid(),
          name: 'Email',
          position: {
            x: 320,
            y: 120,
          },
          svg: `assets/svgs/input-email.svg`,
        },
        {
          id: parseFloat((Math.random() * 10000000).toFixed(0)),
          uuid: this.uuid(),
          name: 'Website',
          position: {
            x: 320,
            y: 120,
          },
          svg: `assets/svgs/input-website.svg`,
        },
        {
          id: parseFloat((Math.random() * 10000000).toFixed(0)),
          uuid: this.uuid(),
          name: 'Date',
          position: {
            x: 320,
            y: 120,
          },
          svg: `assets/svgs/input-date.svg`,
        },
        {
          id: parseFloat((Math.random() * 10000000).toFixed(0)),
          uuid: this.uuid(),
          name: 'Phone',
          position: {
            x: 320,
            y: 120,
          },
          svg: `assets/svgs/input-phone.svg`,
        },
        {
          id: parseFloat((Math.random() * 10000000).toFixed(0)),
          uuid: this.uuid(),
          name: 'Button',
          position: {
            x: 320,
            y: 120,
          },
          svg: `assets/svgs/input-button.svg`,
        },
        {
          id: parseFloat((Math.random() * 10000000).toFixed(0)),
          uuid: this.uuid(),
          name: 'Payment',
          position: {
            x: 320,
            y: 120,
          },
          svg: `assets/svgs/input-payment.svg`,
        },
      ],
    },
    {
      uuid: this.uuid(),
      name: 'toolbar',
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
        {
          id: parseFloat((Math.random() * 10000000).toFixed(0)),
          uuid: this.uuid(),
          name: 'Video',
          position: {
            x: 320,
            y: 120,
          },
          svg: `assets/svgs/video.svg`,
        },
        {
          id: parseFloat((Math.random() * 10000000).toFixed(0)),
          uuid: this.uuid(),
          name: 'Embed',
          position: {
            x: 320,
            y: 120,
          },
          svg: `assets/svgs/embed.svg`,
        },
      ],
    },
    {
      uuid: this.uuid(),
      name: 'logics',
      blocks: [
        {
          id: parseFloat((Math.random() * 10000000).toFixed(0)),
          uuid: this.uuid(),
          name: 'Set variable',
          position: {
            x: 320,
            y: 120,
          },
          svg: `assets/svgs/logic-variable.svg`,
        },
        {
          id: parseFloat((Math.random() * 10000000).toFixed(0)),
          uuid: this.uuid(),
          name: 'Condition',
          position: {
            x: 320,
            y: 120,
          },
          svg: `assets/svgs/logic-condition.svg`,
        },
        {
          id: parseFloat((Math.random() * 10000000).toFixed(0)),
          uuid: this.uuid(),
          name: 'Redirect',
          position: {
            x: 320,
            y: 120,
          },
          svg: `assets/svgs/logic-redirect.svg`,
        },
        {
          id: parseFloat((Math.random() * 10000000).toFixed(0)),
          uuid: this.uuid(),
          name: 'Code',
          position: {
            x: 320,
            y: 120,
          },
          svg: `assets/svgs/logic-code.svg`,
        },
        {
          id: parseFloat((Math.random() * 10000000).toFixed(0)),
          uuid: this.uuid(),
          name: 'Typebot',
          position: {
            x: 320,
            y: 120,
          },
          svg: `assets/svgs/logic-typebot.svg`,
        },
      ],
    },
    {
      uuid: this.uuid(),
      name: 'integerations',
      blocks: [
        {
          id: parseFloat((Math.random() * 10000000).toFixed(0)),
          uuid: this.uuid(),
          name: 'Webhook',
          position: {
            x: 320,
            y: 120,
          },
          svg: `assets/svgs/integeration-webhook.svg`,
        },
        {
          id: parseFloat((Math.random() * 10000000).toFixed(0)),
          uuid: this.uuid(),
          name: 'Email',
          position: {
            x: 320,
            y: 120,
          },
          svg: `assets/svgs/integeration-email.svg`,
        },
      ],
    },
  ];

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
        }
      ],
    },
  ];

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

  drop(event: CdkDragDrop<Block[]>, container: string) {
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
      this.addNewContainer(event.previousContainer.data[event.previousIndex], event);
    } else if ( container === "container") {
      this.addNewContainer(event.previousContainer.data[event.previousIndex], event);
      event.previousContainer.data.splice(event.previousIndex, 1);
    } else {
      console.log("event.container.data", event.container.data)
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );

      if (event.previousContainer.data.length == 0) {
        this.groupBlocks = this.groupBlocks.filter(
          (gb) => gb.blocks.length > 0
        );
      }
    }
  }

  addNewContainer(newGroup: any, event: any) {
    let lastIndex = this.groupBlocks.length;
    let nextIndex = ++lastIndex;

    this.groupBlocks.push({
      id: parseFloat((Math.random() * 10000000).toFixed(0)),
      uuid: this.uuid(),
      name: `Group # ${nextIndex}`,
      position: {
        x: event.dropPoint.x,
        y: event.dropPoint.y,
      },
      draggable: true,
      blocks: [newGroup],
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
