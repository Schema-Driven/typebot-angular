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
import { ActivatedRoute } from '@angular/router';
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
  translateLevel: number = 10;
  editedGroupName: number = -1;
  deg: number = 3;
  edges: Edge[] = [];
  viewChat: boolean = false;
  previewChat: boolean = false;
  draw: string = 'false';
  oldx: any;
  editorSettings: boolean = false;
  saveFlow: boolean = false;
  clickEventSubscription: any;

  typebot: TypeBot = {
    name: 'Schema Typebot',
    edges: this.edges,
    groups: this.groupBlocks,
  };

  constructor(
    private modalService: NgbModal,
    private route: ActivatedRoute,
    protected editorService: EditorService
  ) {
    super(editorService);
  }

  ngOnInit() {
    this.clickEventSubscription = this.editorService
      .getHelpClickEvent()
      .subscribe(() => {
        this.viewChat = true;
      });
    window.addEventListener('click', (e) => {
      const target = e.target as HTMLTextAreaElement;
      if (!target.classList.contains('setting-icon')) {
        this.editorSettings = false;
      }
    });

    this.createInstance(this.wrapper);

    this.route.queryParams.subscribe((params) => {
      this.draw = params['draw'];
      if (
        localStorage.getItem('editor') !== undefined &&
        localStorage.getItem('editor') !== null
      ) {
        this.drawEditor(localStorage.getItem('editor'));
      }
    });

    this.bindEvents();

    if (this.draw == 'true') {
      return;
    }

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

    // let typeBotObject: any = localStorage.getItem('editor');

    // if (typeBotObject.groups.length > 1) {
    //   typeBotObject = JSON.parse(typeBotObject);
    //   this.typebot = typeBotObject;
    //   if (typeBotObject.groups.length > 1 || typeBotObject.edges.length > 1) {
    //     this.replayActive(typeBotObject);
    //   } else {
    //     console.log('replay not called');
    //   }
    // }
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
    this.setEdgesObject();
    localStorage.setItem('editor', JSON.stringify(this.typebot));

    let savedArray = this.saveUserActions(this.typebot);
    this.replayActive(this.typebot, savedArray);
    console.log(this.typebot);
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
    } else if (type === 'decrease' && this.scaleLevel > 0.6) {
      this.scaleLevel = this.scaleLevel - 0.1;
    }

    this.wrapper.nativeElement.style.transform =
      'scale(' + this.scaleLevel + ')';
    this.instance.setZoom(this.scaleLevel);
    // this.instance.repaint();
  }

  // zoomHandlerWheel(event: any) {
  //   console.log(event);
  //   if (event.offsetX < this.oldx) {
  //     this.scaleLevel = this.scaleLevel + 0.1;
  //     this.translateLevel = this.translateLevel + 10;
  //   } else if (event.offsetX > this.oldx) {
  //     this.scaleLevel = this.scaleLevel - 0.1;
  //     this.translateLevel = this.translateLevel - 10;
  //   }
  //   this.wrapper.nativeElement.style.transform =
  //     'scale(' + this.scaleLevel + ') ';
  //   this.oldx = event.offsetX;
  //   console.log(this.oldx);
  // }

  showRightClickPopover(type: string, id: string, e: any) {
    const startGroupBlock = document.getElementById(id) as HTMLElement;
    if (
      startGroupBlock.classList.contains('Start') ||
      startGroupBlock.classList.contains('start')
    ) {
      return;
    } else {
      let styleId = document.getElementById(id) as HTMLElement;
      styleId.classList.add('popover-outline-style');
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

  async exportFlow() {
    await this.setEdgesObject();
    this.editorService.setEditorJson(this.typebot);
    var dataStr =
      'data:text/json;charset=utf-8,' +
      encodeURIComponent(JSON.stringify(this.typebot));
    let anchor = document.createElement('a');
    anchor.setAttribute('href', dataStr);
    anchor.setAttribute('download', 'typebot.json');
    anchor.click();
  }

  async printJson() {
    await this.setEdgesObject();
    this.editorService.setEditorJson(this.typebot);
    localStorage.setItem('editor', JSON.stringify(this.typebot));
    console.log(this.typebot);
    this.saveFlow = true;
    setTimeout(() => {
      this.saveFlow = false;
    }, 1000);
    //window.location.href = window.location.pathname + '?draw=true';
  }

  async setEdgesObject() {
    this.edges = [];
    let connections = this.instance.getConnections({
      scope: 'jsplumb_defaultscope',
    });

    connections.forEach((con: any) => {
      let from: any = {},
        to: any = {};
      let sourceIdentifier = document
        .getElementById(con.sourceId)
        ?.getAttribute('data-identifier');
      let targetIdentifier = document
        .getElementById(con.targetId)
        ?.getAttribute('data-identifier');

      from['blockId'] = document
        .getElementById(con.sourceId)
        ?.closest('.single-block')
        ?.getAttribute('id');
      from['groupId'] = document
        .getElementById(con.sourceId)
        ?.closest('.grouper')
        ?.getAttribute('id');

      if (sourceIdentifier === 'item') {
        from['itemId'] = document
          .getElementById(con.sourceId)
          ?.closest('.single-item')
          ?.getAttribute('id');
      }

      to['groupId'] = document
        .getElementById(con.targetId)
        ?.closest('.grouper')
        ?.getAttribute('id');
      if (targetIdentifier === 'block') {
        to['blockId'] = document
          .getElementById(con.targetId)
          ?.closest('.single-block')
          ?.getAttribute('id');
      }

      this.edges.push({
        id: this.uuid(),
        from,
        to,
      });
    });
    this.typebot.edges = this.edges;
    this.typebot.groups = this.groupBlocks;
  }

  showRightBar() {
    this.editorService.sendPreviewClickEvent();
  }

  saveUserActions = (groupBlock: any) => {
    let lastGroup = groupBlock.groups.length - 1;
    let lastBlock = groupBlock.groups[lastGroup].blocks.length - 1;
    if (groupBlock.groups[lastGroup].blocks.length === 1) {
      let data = {
        type: 'group',
        id: groupBlock.groups[lastGroup].id,
      };
      this.savePoppedEle.push(data);
    } else if (groupBlock.groups[lastGroup].blocks.length > 1) {
      let data = {
        type: 'block',
        id: groupBlock.groups[lastGroup].blocks[lastBlock].id,
      };
      this.savePoppedEle.push(data);
    }
    console.log(this.savePoppedEle);
    return this.savePoppedEle;
  };

  replayActive(typeBot: any, saveArray: any) {
    const undo = <any>document.querySelector('#undoBtn');
    if (typeBot.groups.length > 1 || typeBot.edges.length > 1) {
      this.removeUndoBtnStyle(undo);
      undo.addEventListener('click', () => {
        this.undoBtnFunction(typeBot, undo, saveArray);
      });
    } else {
      this.addUndoBtnStyle(undo);
    }
  }

  undoBtnFunction(typeBot: any, undoBtn: any, saveArray: any) {
    let popElementId: any;
    console.log(saveArray.length);
    if (saveArray.length > 0) {
      popElementId = saveArray.splice(-1);
      console.log(popElementId[0]);
      if (popElementId[0].type === 'group') {
        typeBot.groups.forEach((group: any, key: any) => {
          if (popElementId[0].id === group.id) {
            console.log('group', group.id);
            typeBot.groups.splice(key, 1);
            return;
          }
        });
      } else if (popElementId[0].type === 'edge') {
        typeBot.edges.forEach((edge: any, key: any) => {
          if (popElementId[0].id === `be-${edge.from.blockId}`) {
            console.log('edge');
            let a = <any>(
              document.querySelector(
                `[connector-source-id=be-${edge.from.blockId}]`
              )
            );
            console.log(a);
            this.deleteConnection(popElementId[0].id);
          }
        });
      } else if (popElementId[0].type === 'block') {
        typeBot.groups.forEach((group: any) => {
          group.blocks.forEach((block: any, key: any) => {
            if (popElementId[0].id === block.id) {
              console.log('block', block.id);
              group.blocks.splice(key, 1);
              return;
            }
          });
        });
      } else {
        console.log('Invalid access');
      }
      const redo = <any>document.querySelector('#redoBtn');
      this.removeRedoBtnStyle(redo);
    } else {
      this.addUndoBtnStyle(undoBtn);
    }
    console.log(typeBot);
  }

  removeUndoBtnStyle(btn: any) {
    btn?.removeAttribute('disabled');
    btn.style.cursor = 'pointer';
    btn.style.opacity = '1';
  }
  addUndoBtnStyle(btn: any) {
    btn?.setAttribute('disabled', '');
    btn.style.cursor = 'not-allowed';
    btn.style.opacity = '0.5';
  }

  removeRedoBtnStyle(btn: any) {
    btn?.removeAttribute('disabled');
    btn.style.cursor = 'pointer';
    btn.style.opacity = '1';
  }
  addRedoBtnStyle(btn: any) {
    btn?.setAttribute('disabled', '');
    btn.style.cursor = 'not-allowed';
    btn.style.opacity = '0.5';
  }
}
