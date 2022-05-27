import { Component, AfterViewInit } from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem, copyArrayItem} from '@angular/cdk/drag-drop';
import { jsPlumb } from 'jsplumb';

@Component({
  selector: 'editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})
export class EditorComponent implements AfterViewInit {

  jsPlumbInstance :any;
  showConnectionToggle = false;
  buttonName = 'Connect';

  toolbar = [
    {
      id : 1,
      name : 'AButton',
      position : {
        x : 320,
        y : 120,
      },
    },
    {
      id : 2,
      name : 'SButton',
      position : {
        x : 320,
        y : 120,
      },
    },
    {
      id : 3,
      name : 'DButton',
      position : {
        x : 320,
        y : 120,
      },
    },
    {
      id : 4,
      name : 'FButton',
      position : {
        x : 320,
        y : 120,
      },
    }
  ]

  blocks = [
    {
      id: 0,
      name: 'start',
      position : {
        x : 320,
        y : 120,
      },
    },
    {
      id: 200,
      name: 'nodeA',
      position : {
        x : 520,
        y : 120,
      },
    },
    {
      id: 300,
      name: 'nodeB',
      position : {
        x : 720,
        y : 120,
      },
    }
  ]

  ngAfterViewInit() {
    this.jsPlumbInstance = jsPlumb.getInstance();
    // this.showConnectOnClick();
  }
  
  positioning(event : any,id : any){
    //console.log(event);
    let index = this.blocks.findIndex(b => b.id == id);
    if(index !== -1){
      this.blocks[index].position.x = event.pointerPosition.x
      this.blocks[index].position.y = event.pointerPosition.y
    }
  }

  drop(event: CdkDragDrop<any[]>) {
    console.log('before drop',this.blocks)
    console.warn('toolbar dropped');
    console.log(event);
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      this.blocks.push({
        ...this.toolbar[event.previousIndex],
        id : Math.random(),
        position : {
          x : event.dropPoint.x,
          y : event.dropPoint.y,
        },
      });
      console.log('after drop',this.blocks)
    }
  }

  // Emits when the user drops the item inside a container.
  cdkDragDropped(event : any){
    console.warn("the user drops the item inside a container.")
    console.log(event)
  }
  // Emits when the user stops dragging an item in the container.
  cdkDragEnded(event : any){
    console.warn("the user stops dragging an item in the container.")
    console.log(event)
  }

  // Emits when the user has moved the item into a new container.
  cdkDragEntered(event : any){
    console.warn("the user has moved the item into a new container.")
    console.log(event)
  }

  // Emits when the user removes the item its container by dragging it into another container.
  cdkDragExited(event : any){
    console.warn("the user removes the item its container by dragging it into another container.")
    console.log(event)
  }

  // Emits as the user is dragging the item. Use with caution, because this event will fire for every pixel that the user has dragged.
  cdkDragMoved(event : any,id : any){
    //console.warn("the user is dragging the item. Use with caution, because this event will fire for every pixel that the user has dragged.")
    //console.log(event)
    this.positioning(event,id);
    this.jsPlumbInstance.repaintEverything();
  }

  // Emits when the user has released a drag item, before any animations have started.
  cdkDragReleased(event : any){
    console.warn("the user has released a drag item, before any animations have started.")
    console.log(event)
  }
 
  // Emits when the user starts dragging the item.
  cdkDragStarted(event : any){
    console.warn("the user starts dragging the item.")
    console.log(event)
  }

  connectSourceToTargetUsingJSPlumb() {
    this.jsPlumbInstance.connect({
      connector: [
        'Flowchart',
        { stub: [212, 67], cornerRadius: 1, alwaysRespectStubs: true },
      ],
      source: '200',
      target: '300',
      anchor: ["Right","Left","Top","Bottom"],
      paintStyle: { stroke: '#456', strokeWidth: 4 },
      overlays: [
        [
          'Label',
          {
            location: 0.5,
            cssClass: 'connectingConnectorLabel',
          },
        ],
      ],
    });
  }
}