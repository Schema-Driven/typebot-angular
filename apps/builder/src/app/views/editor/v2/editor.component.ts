import { Component, ViewChild, ElementRef } from '@angular/core';
import {
  CdkDrag,
  CdkDragDrop,
  CdkDropList,
  moveItemInArray,
  transferArrayItem,
  copyArrayItem,
} from '@angular/cdk/drag-drop';
import { jsPlumb } from 'jsplumb';
import * as jsPlumbBrowserUI from '@jsplumb/browser-ui';
import { newInstance } from '@jsplumb/browser-ui';
import { AnchorLocations, AnchorSpec, AnchorOptions } from '@jsplumb/common';
import { GroupBlock, Block } from './editor.interfaces';
import { StructuredBlocks } from './group-structured-blocks';

@Component({
  selector: 'editorv2',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css'],
})
export class Editorv2Component extends StructuredBlocks {
  @ViewChild('wrapper', { static: true })
  wrapper!: ElementRef;
  @ViewChild('drawing', { static: true })
  drawing!: ElementRef;
  jsPlumbInstance: any;
  instance: any;
  deg: number = 3;
  endpoints: any[] = [];
  sidePanel: boolean = false;
  dragableContainer: any;

  firstGroupId = this.uuid();
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
          id: this.uuid(),
          groupId: this.firstGroupId,
          type: 'start',
        },
      ],
    },
  ];

  ngOnInit() {
    this.dragableContainer = jsPlumbBrowserUI.newInstance({
      container: this.drawing.nativeElement,
    });

    this.instance = newInstance({
      dragOptions: this.dragOptions,
      connectionOverlays: this.connectionOverlays,
      connector: this.connectorProp,
      container: this.wrapper.nativeElement,
    });

    this.instance.addTargetSelector('.single-group', {
      ...this.targetEndpoint,
      ...{
        anchor: 'ContinuousLeft',
        scope: 'target_scope',
      },
    });

    this.manageNode(this.firstGroupId, ['Right']);
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
      event.previousContainer.data.splice(event.previousIndex, 1);
      this.removeEmptyGroupBlocks(event);
    } else {
      console.log('event.container.data', event.container.data);
      this.addGroupOrBlock(
        event.previousContainer.data[event.previousIndex],
        event,
        'block'
      );
      event.previousContainer.data.splice(event.previousIndex, 1);
      this.removeEmptyGroupBlocks(event);
    }
  }

  addGroupOrBlock(data: any, event: any, type: string) {
    let blockId = this.uuid();
    if (type === 'group') {
      let groupId = this.uuid();
      let block = {
        ...data,
        id: blockId,
        groupId: groupId,
      };

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
        this.manageNode(groupId, ['Right']);
      }, 100);
    } else {
      let groupId = event.container.data[0].groupId;
      let block = {
        ...data,
        id: blockId,
        groupId: groupId,
      };

      this.groupBlocks.map((group) => {
        if (group.id == groupId) {
          group.blocks.push(block);
        }
      });

      // setTimeout(() => {
      //   this.manageNode(blockId, ['Left']);
      // }, 100);
    }
  }

  manageNode(id: string, location: any) {
    setTimeout(() => {
      this.instance.manage(document.getElementById(id));
      this._addEndPoint(id, location);
    });
  }

  _addEndPoint(id: string, sourceAnchors: Array<AnchorSpec>) {
    const element = this.instance.getManagedElement(id);
    for (let i = 0; i < sourceAnchors.length; i++) {
      const sourceUUID = id + sourceAnchors[i];
      this.endpoints.push({
        identifier: id.toString(),
        instance: this.instance.addEndpoint(element, this.sourceEndpoint, {
          anchor: sourceAnchors[i],
          uuid: sourceUUID,
          scope: 'target_scope',
        }),
      });
    }
  }

  _removeEndPoint(id: string) {
    this.instance.manage(document.getElementById(id));
    const element = this.instance.getManagedElement(id);
    this.instance.removeAllEndpoints(element);
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
    console.log('groupBlocks', this.groupBlocks);
  }

  zoomHnadler(event: any, n: any) {
    this.drawing.nativeElement.style.transform = 'scale(' + n + ')';
  }
}
