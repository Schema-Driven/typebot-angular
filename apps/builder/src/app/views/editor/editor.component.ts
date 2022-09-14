import { Component, ViewChild, ElementRef, Attribute } from '@angular/core';
import {
  CdkDrag,
  CdkDragDrop,
  CdkDropList,
  moveItemInArray,
  transferArrayItem,
  copyArrayItem,
} from '@angular/cdk/drag-drop';
import Panzoom from '@panzoom/panzoom';
import { Block, Edge, TypeBot } from './editor.interfaces';
import { Editor } from './editor';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EditorService } from '../../services/editor.service';

@Component({
  selector: 'editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css'],
})
export class EditorComponent extends Editor {
  @ViewChild('wrapper', { static: true })
  wrapper!: ElementRef;
  panZoomController: any;
  scaleLevel: number = 1;
  editedGroupName: number = -1;
  deg: number = 3;
  edges: Edge[] = [];
  viewChat: boolean = false;

  typebot: TypeBot = {
    name: 'My Typebot',
    edges: this.edges,
    groups: this.groupBlocks,
  };

  constructor(
    private modalService: NgbModal,
    protected editorService: EditorService
  ) {
    super(editorService);
  }

  ngOnInit() {
    this.createInstance(this.wrapper);

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
    this.manageNode('be-' + this.firstBlockId, ['Right'], 'block');
    this.groupBlockIdsMapping[this.firstBlockId] = this.firstGroupId;
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
      this.removeEmptyGroupBlocks(event.previousContainer.data);
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
      this.removeEmptyGroupBlocks(event.previousContainer.data);
    }

    // this.editorService.setGroupBlocks(this.groupBlocks);
  }

  addGroupOrBlock(data: any, event: any, type: string) {
    let blockId = this.uuid();
    let groupId =
      type === 'group' ? this.uuid() : event.container.data[0].groupId;

    let block = {
      ...JSON.parse(JSON.stringify(data)),
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
        this.manageNode('be-' + blockId, ['Right'], 'block');
      }, 100);
    } else {
      // Add Block to Group
      this.groupBlocks.map((group) => {
        if (group.id == groupId) {
          // group.blocks.push(block);
          let lastIndex = group.blocks.length;
          if (lastIndex === event.currentIndex) {
            this._removeEndPoint(group.blocks[lastIndex - 1].id);
            this._removeEndPoint('be-' + group.blocks[lastIndex - 1].id);
            this.manageNode('be-' + blockId, ['Right'], 'block');
          }
          group.blocks.splice(event.currentIndex, 0, block);
        }
      });
    }

    this.groupBlockIdsMapping[blockId] = groupId;
  }

  removeEmptyGroupBlocks(data: any) {
    if (data.length == 0) {
      let endpointId: any;
      this.groupBlocks = this.groupBlocks.filter((gb) => {
        if (gb.blocks.length === 0) {
          endpointId = gb.id;
        }
        return gb.blocks.length > 0;
      });

      if (endpointId) {
        // this._removeEndPoint(endpointId);
        this.instance.removeGroup(endpointId);
      }
    }
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

  zoomHandler(type: string) {
    // check maximum and minimum level of zoom
    if (type === 'increase' && this.scaleLevel <= 1.2) {
      this.scaleLevel = this.scaleLevel + 0.1;
    } else if (type === 'decrease' && this.scaleLevel > 0.8) {
      this.scaleLevel = this.scaleLevel - 0.1;
    }

    this.wrapper.nativeElement.style.transform =
      'scale(' + this.scaleLevel + ')';
    this.instance.setZoom(this.scaleLevel);
    // this.instance.repaint();
  }

  showRightClickPopover(type: string, id: string, e: any) {
    if (this.firstGroupId !== id && this.firstBlockId !== id) {
      id = type + '-' + id;
      if (document.getElementById(id)) {
        let index = document
          .getElementById(id)
          ?.getAttribute('data-popover-index');
        this.rightClickPopovers[type].splice(index, 1);
      }

      this.rightClickPopovers[type].push({
        position: { x: e.clientX, y: e.clientY },
        type: type,
        id: id,
      });
      return false;
    }
    return true;
  }

  popoverHandler(type: string, id: string, index: number) {
    let groupIndex: any;
    let blockIndex: any;
    id = id.replace(type + '-', '');

    if (type === 'connector') {
      this.deleteConnection(id);
    } else if (type === 'group') {
      groupIndex = document
        .getElementById(id)
        ?.getAttribute('data-group-index');
      this.instance.removeGroup(id);
      this.groupBlocks.splice(groupIndex, 1);
    } else if (type === 'block') {
      groupIndex = document
        .getElementById(id)
        ?.closest('.grouper')
        ?.getAttribute('data-group-index');
      blockIndex = document
        .getElementById(id)
        ?.getAttribute('data-block-index');
      this._removeEndPoint(id);
      this.groupBlocks[groupIndex].blocks.splice(blockIndex, 1);

      // Remove empty groups
      if (this.groupBlocks[groupIndex].blocks.length === 0) {
        this.instance.removeGroup(this.groupBlocks[groupIndex].id);
        this.groupBlocks.splice(groupIndex, 1);
      }
    } else if (type === 'itemField') {
      groupIndex = document
        .getElementById(id)
        ?.closest('.grouper')
        ?.getAttribute('data-group-index');
      blockIndex = document
        .getElementById(id)
        ?.closest('.single-block')
        ?.getAttribute('data-block-index');
      let itemIndex = document
        .getElementById(id)
        ?.getAttribute('data-item-index');
      this.groupBlocks[groupIndex].blocks[blockIndex].items.splice(
        itemIndex,
        1
      );
    }

    this.rightClickPopovers[type].splice(index, 1);
  }

  showBlockOptionsPopover(
    popover: any,
    block: any,
    groupIndex: number,
    blockIndex: number
  ) {
    if (popover.isOpen()) {
      popover.close();
    } else {
      this.removeAllPopovers();
      this.editorService.setBlock(block);
      popover.open({ block, groupIndex, blockIndex });
    }
  }

  removeAllPopovers() {
    const elems = document.querySelectorAll('.input-popover');
    elems.forEach((e) => {
      e.remove();
    });
  }

  open(content: any, groupIndex: number, blockIndex: number) {
    this.removeAllPopovers();
    this.modalService.open(content, { ariaLabelledBy: 'block-modal' });
  }

  onGroupNameClick(index: number) {
    if (index !== 0) {
      this.editedGroupName = index;
    }
  }

  onGroupNameChange(group: any, e: any) {
    group.name = e.target.value;
  }

  onDragRecieverContainer() {
    this.editedGroupName = -1;
  }

  manageItemEndpoints(data: any) {
    if (data.action === 'add') {
      data.itemIds.forEach((id: string) => {
        this.manageNode(id, ['Right'], 'block');
      });
    } else {
      data.itemIds.forEach((id: string) => {
        this._removeEndPoint(id);
      });
    }
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
}
