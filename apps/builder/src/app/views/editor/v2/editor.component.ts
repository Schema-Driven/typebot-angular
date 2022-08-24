import { Component, ViewChild, ElementRef, Attribute } from '@angular/core';
import {
  CdkDrag,
  CdkDragDrop,
  CdkDropList,
  moveItemInArray,
  transferArrayItem,
  copyArrayItem,
} from '@angular/cdk/drag-drop';
import {
  newInstance,
  EVENT_CLICK,
  EVENT_ELEMENT_CLICK,
} from '@jsplumb/browser-ui';
import { AnchorLocations, AnchorSpec, AnchorOptions } from '@jsplumb/common';
import Panzoom from '@panzoom/panzoom';
import { GroupBlock, Block, Edge, TypeBot } from './editor.interfaces';
import { StructuredBlocks } from './group-structured-blocks';

@Component({
  selector: 'editorv2',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css'],
})
export class Editorv2Component extends StructuredBlocks {
  @ViewChild('wrapper', { static: true })
  wrapper!: ElementRef;
  instance: any;
  panZoomController: any;
  deg: number = 3;
  edges: Edge[] = [];
  groupBlockIdsMapping: any = {};
  sidePanel: boolean = false;
  rightClick: boolean = false;

  firstGroupId = this.uuid();
  firstBlockId = this.uuid();
  groupBlocks: GroupBlock[] = [
    {
      id: this.firstGroupId,
      name: 'Start',
      position: {
        x: 420,
        y: 120,
      },
      draggable: true,
      blocks: [
        {
          id: this.firstBlockId,
          groupId: this.firstGroupId,
          type: 'start',
        },
      ],
    },
  ];

  typebot: TypeBot = {
    name: 'My Typebot',
    edges: this.edges,
    groups: this.groupBlocks,
  };

  onClick(event: any) {
    // this.groupBlocks[index].popover = false;
    console.log(event);
  }

  ngOnInit() {
    this.instance = newInstance({
      dragOptions: this.dragOptions,
      connectionOverlays: this.connectionOverlays,
      connector: this.connectorProp,
      container: this.wrapper.nativeElement,
    });

    this.instance.addTargetSelector('.single-group, .single-block', {
      ...this.targetEndpoint,
      ...{
        anchor: 'ContinuousLeft',
        scope: 'target_scope',
        redrop: 'any',
      },
    });

    this.bindEvents();

    // this.panZoomController.pan(10, 10)
    // this.panZoomController.zoom(1, { animate: true });
    // this.panZoomController = Panzoom(this.wrapper.nativeElement, {
    //   minScale: 0.6,
    //   maxScale: 1.5,
    //   increment: 0.1,
    //   cursor: "",
    //   excludeClass: 'grouper'
    // });

    // this.wrapper.nativeElement.parentElement.addEventListener('wheel', (e: any) => {
    //   if(e.ctrlKey == true) {
    //     e.preventDefault();
    //     this.panZoomController.zoomWithWheel(e)
    //   } else {
    //     e.preventDefault();
    //     var deltaY = e.deltaY || e.wheelDeltaY || (-e.deltaY);
    //     var deltaX = e.deltaX || e.wheelDeltaX || (-e.deltaX);
    //     this.panZoomController.pan(deltaX/2, deltaY/2, {
    //       // animate: true,
    //       relative: true,
    //     });
    //   }

    //   this.zoomHandler(this.panZoomController.getScale(), 'scroller');
    // });
    // this.instance.repaintEverything();

    this.manageNode(this.firstGroupId, ['Right'], 'group');
    this.manageNode(this.firstBlockId, ['Right'], 'block');
    this.groupBlockIdsMapping[this.firstBlockId] = this.firstGroupId;
  }

  ngAfterViewInit() {
    this.wrapper.nativeElement.addEventListener(
      'click',
      this.onRightClick.bind(this)
    );
  }

  sidePanelClick() {
    this.sidePanel = !this.sidePanel;
  }

  drop(event: CdkDragDrop<Block[]>, container: string) {
    console.log('event', event);
    console.log('container', container);
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );

      this.rearrangeEndPoints(event.container.data, event.previousIndex, false);
    } else if (
      event.previousContainer.id === 'fixed-list' &&
      event.container.id === 'receiving-list'
    ) {
      this.addGroupOrBlock(
        event.previousContainer.data[event.previousIndex],
        event,
        'block'
      );
    } else if (event.previousContainer.id === 'fixed-list') {
      this.addGroupOrBlock(
        event.previousContainer.data[event.previousIndex],
        event,
        'group'
      );
    } else if (container === 'container') {
      this.addGroupOrBlock(
        event.previousContainer.data[event.previousIndex],
        event,
        'group'
      );

      this.rearrangeEndPoints(
        event.previousContainer.data,
        event.previousIndex,
        true
      );
      this.removeEmptyGroupBlocks(event);
    } else {
      this.addGroupOrBlock(
        event.previousContainer.data[event.previousIndex],
        event,
        'block'
      );

      this.rearrangeEndPoints(
        event.previousContainer.data,
        event.previousIndex,
        true
      );
      this.removeEmptyGroupBlocks(event);
    }
  }

  rearrangeEndPoints(data: any, index: number, slice: boolean = false) {
    this._removeEndPoint(data[index].id);
    if (slice === true) {
      data.splice(index, 1);
    }

    if (data.length) {
      let groupId = data[0].groupId;
      this.groupBlocks.forEach((group) => {
        if (group.id === groupId) {
          group.blocks.forEach((block) => {
            this._removeEndPoint(block.id);
          });
          // Add endpoint to last block
          this.manageNode(
            group.blocks[group.blocks.length - 1].id,
            ['Right'],
            'block'
          );
        }
      });
    }
  }

  addGroupOrBlock(data: any, event: any, type: string) {
    let blockId = this.uuid();
    let groupId =
      type === 'group' ? this.uuid() : event.container.data[0].groupId;
    let block = {
      ...data,
      id: blockId,
      groupId: groupId,
    };

    if (type === 'group') {
      // Add New Group Block
      this.groupBlocks.push({
        id: groupId,
        name: `Group # ${this.groupBlocks.length + 1}`,
        position: {
          x: event.dropPoint.x,
          y: event.dropPoint.y,
        },
        draggable: true,
        blocks: [block],
      });

      setTimeout(() => {
        this.manageNode(groupId, ['Right'], 'group');
        this.manageNode(blockId, ['Right'], 'block');
      }, 100);
    } else {
      // Add Block to Group
      this.groupBlocks.map((group) => {
        if (group.id == groupId) {
          // group.blocks.push(block);
          let lastIndex = group.blocks.length;
          if (lastIndex === event.currentIndex) {
            this._removeEndPoint(group.blocks[lastIndex - 1].id);
            this.manageNode(blockId, ['Right'], 'block');
          }
          group.blocks.splice(event.currentIndex, 0, block);
        }
      });
    }

    this.groupBlockIdsMapping[blockId] = groupId;
  }

  manageNode(id: string, location: any, type: string) {
    setTimeout(() => {
      // this.instance.manage(document.getElementById(id));
      this._addEndPoint(id, location, type);
    });
  }

  _addEndPoint(
    id: string,
    sourceAnchors: Array<AnchorSpec>,
    type: string = 'block'
  ) {
    let sourcePoint =
      type === 'block' ? this.sourceEndpoint : this.groupSourceEndpoint;

    if (type === 'group') {
      this.instance.addGroup({
        el: document.getElementById(id),
        id: id,
        droppable: false,
        // dropOverride:true
      });
    }

    // const element = this.instance.getManagedElement(id);
    for (let i = 0; i < sourceAnchors.length; i++) {
      const sourceUUID = id + sourceAnchors[i];
      this.instance.addEndpoint(document.getElementById(id), sourcePoint, {
        anchor: sourceAnchors[i],
        uuid: sourceUUID,
      });
    }
  }

  _removeEndPoint(id: string) {
    this.instance.manage(document.getElementById(id));
    const element = this.instance.getManagedElement(id);
    this.instance.removeAllEndpoints(document.getElementById(id));
  }

  removeEmptyGroupBlocks(event: any) {
    if (event.previousContainer.data.length == 0) {
      let endpointId: any;
      this.groupBlocks = this.groupBlocks.filter((gb) => {
        if (gb.blocks.length === 0) {
          endpointId = gb.id;
        }
        return gb.blocks.length > 0;
      });

      if (endpointId) {
        this._removeEndPoint(endpointId);
      }
    }
  }

  /** Predicate function that doesn't allow items to be dropped into a list. */
  noReturnPredicate() {
    return false;
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

  printJson() {
    this.setEdgesObject();
    console.log(this.typebot);
  }

  setEdgesObject() {
    this.edges = [];
    let connections = this.instance.getConnections({
      scope: 'jsplumb_defaultscope',
    });
    connections.forEach((con: any) => {
      this.edges.push({
        id: this.uuid(),
        from: {
          blockId: con.sourceId,
          groupId: this.groupBlockIdsMapping[con.sourceId],
        },
        to: { groupId: con.targetId },
      });
    });
    this.typebot.edges = this.edges;
  }

  zoomHandler(n: any, ref = 'btns') {
    if (ref === 'btns') {
      this.wrapper.nativeElement.style.transform = 'scale(' + n + ')';
    }

    this.instance.setZoom(n);
    // this.instance.repaint();
  }

  bindEvents() {
    this.instance.bind('connection', (info: any) => {
      var connection = info.connection;
      console.log('connection', connection);
      connection.bind('click', (connection: any, originalEvent: any) => {
        alert('you clicked on ' + connection);
        this.instance.detach(connection);
      });
      // var connection = info.connection;
      // console.log("connection", connection);
      // connection.bind("click", (connection: any, originalEvent: any) => {
      //   alert("you clicked on "+connection);
      //   this.instance.detach(connection);
      // });
    });

    this.instance.bind(EVENT_CLICK, (connection: any, originalEvent: any) => {
      console.log('Aaa12345');
      alert('you clicked on ' + connection);
      // this.instance.detach(connection);
    });

    this.instance.bind(
      EVENT_ELEMENT_CLICK,
      (connection: any, originalEvent: any) => {
        console.log('Aaa123');
        alert('you clicked on ' + connection);
        // this.instance.detach(connection);
      }
    );
  }

  // right click function

  onRightClick(index: any) {
    if (index === 0) {
      return true;
    }
    this.groupBlocks[index].popover = true;
    return `
      <div class="absolute top-0 w-48 -right-0">
        <div class="bg-white rounded-md border shadow text-lg font-semibold">
          <div class="flex items-center gap-3 text-gray-500 p-3 hover:bg-gray-100">
            <span class="w-5 h-5 popover-icon"><img class="w-full h-full" src="../../../../assets/svgs/clone-regular.svg"/></span>
            <p class="">Duplicate</p>
          </div>
          <div class="flex items-center  gap-3 text-gray-500 p-3 hover:bg-gray-100">
            <span class="w-5 h-5  popover-icon"><img class="w-full h-full" src="../../../../assets/svgs/trash-solid.svg" /></span>
            <p class="">Delete</p>
          </div>
        </div>
      </div>
    `;
  }
}
