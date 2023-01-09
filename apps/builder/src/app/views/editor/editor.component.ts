import {
  Component,
  ViewChild,
  ElementRef,
  Attribute,
  ComponentFactoryResolver,
} from '@angular/core';
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
  undoEventSubscription: any;
  redoEventSubscription: any;
  eventCheck: boolean = true;
  collectTypeBot: any;
  collectSavedArray: any;
  redoArray: any = [];
  oldGroup: any = [];
  typebot: TypeBot = {
    name: 'Schema Typebot',
    edges: this.edges,
    groups: this.groupBlocks,
  };
  Group:any
  Block:any

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
    this.undoEventSubscription = this.editorService
      .getUndoClickEvent()
      .subscribe(() => {
        const undo = <any>document.querySelector('#undoBtn');
        this.undoBtnFunction(this.collectTypeBot, undo, this.collectSavedArray);
      });
    this.redoEventSubscription = this.editorService
      .getRedoClickEvent()
      .subscribe(() => {
        this.redoBtnFunction();
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

    /* //////// Pan And Zoom Function //////// */
    const elem = <any>document.getElementById('group_wrapper_main');
    const panzoom = Panzoom(elem, {
      maxScale: 5,
      touchAction: true,
      cursor: 'default',
      excludeClass: 'grouper',
      disableZoom: true,
    });

    elem.parentElement.addEventListener('wheel', (event: any) => {
      //   panzoom.zoomWithWheel(event);
      if (event.deltaY < 0) {
        this.zoomHandler('increase');
      } else if (event.deltaY > 0) {
        this.zoomHandler('decrease');
      }
    });

    /* //////// Pan And Zoom Function End //////// */

    this.manageNode(this.firstGroupId, ['Right'], 'group');
    this.manageNode('be-' + this.firstBlockId, ['Right'], 'block');
    this.groupBlockIdsMapping[this.firstBlockId] = this.firstGroupId;

    // this.customPanAndZoom();
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
      this._removeEndPoint(event.previousContainer.data[event.previousIndex].id);
      this._removeEndPoint('be-' + event.previousContainer.data[event.previousIndex].id);
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

    const undo = <any>document.querySelector('#undoBtn');
    if (undo.classList.contains('cursor-not-allowed')) {
      this.removeUndoBtnStyle(undo);
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
      this.saveUserActions('group', groupId, 'dragged');
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
      this.saveUserActions('block', blockId, 'dragged');
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
    } else if (type === 'decrease' && this.scaleLevel > 0.2) {
      this.scaleLevel = this.scaleLevel - 0.1;
    }

    this.wrapper.nativeElement.style.transform =
      'scale(' + this.scaleLevel + ')';
    this.instance.setZoom(this.scaleLevel);
    this.instance.repaint();
  }

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
    const undo = <any>document.querySelector('#undoBtn');
    if (undo.classList.contains('cursor-not-allowed')) {
      this.removeUndoBtnStyle(undo);
    }
    let groupIndex: any;
    let blockIndex: any;
    id = id.replace(type + '-', '');
    if (type === 'connector') {
      this.deleteConnection(id);
    } else if (type === 'group') {
      this.saveUserActions(type, id, 'deleted');
      groupIndex = document
        .getElementById(id)
        ?.getAttribute('data-group-index');
      this.instance.removeGroup(id);
      this.oldGroup.push(this.groupBlocks.splice(groupIndex, 1)[0]);
    } else if (type === 'block') {
      groupIndex = document
        .getElementById(id)
        ?.closest('.grouper')
        ?.getAttribute('data-group-index');
      blockIndex = document
        .getElementById(id)
        ?.getAttribute('data-block-index');
      this._removeEndPoint(id);

      if (this.groupBlocks[groupIndex].blocks.length === 1) {
        this.saveUserActions(
          (type = 'group'),
          this.groupBlocks[groupIndex].id,
          'deleted'
        );
        this.instance.removeGroup(this.groupBlocks[groupIndex].id);
        this.oldGroup.push(this.groupBlocks.splice(groupIndex, 1)[0]);
        this.rightClickPopovers.block.splice(0, 1);
      } else {
        // Remove blocks
        let element2 = this.groupBlocks[groupIndex].blocks[blockIndex];
        if(element2.type === 'choice_input'){
          this._removeEndPoint("be-"+id);
          element2.items.forEach((item:any) => {
            this._removeEndPoint("item-"+item.id);
          });
        }
        this.oldGroup.push(
          this.groupBlocks[groupIndex].blocks.splice(blockIndex, 1)
        );
        this._removeEndPoint("be-"+id);
        this.manageNode(
          'be-' +
            this.groupBlocks[groupIndex].blocks[
              this.groupBlocks[groupIndex].blocks.length - 1
            ].id,
          ['Right'],
          'block'
        );

        this.saveUserActions(type, id, 'deleted');
        // Remove empty groups
        if (this.groupBlocks[groupIndex].blocks.length === 0) {
          this.instance.removeGroup(this.groupBlocks[groupIndex].id);
          this.groupBlocks.splice(groupIndex, 1);
        }
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

      let itemFieldLength =
        this.groupBlocks[groupIndex].blocks[blockIndex].items.length;
      if (itemFieldLength > 1) {
        let item = this.groupBlocks[groupIndex].blocks[blockIndex].items.splice(
          itemIndex,
          1
        );
        this._removeEndPoint('item-'+ item[0].id);
      }
    }
    this.rightClickPopovers[type].splice(index, 1);
  }

  duplicateElement(type: string, id: string, index: number) {
    let Groups = this.groupBlocks;
    let copyGroup: any = {};
    let copyBlock: any = {};
    let copyItemField: any = {};
    if (type === 'group') {
      Groups.forEach((group: any) => {
        if (id === 'group-' + group.id) {
          copyGroup = {
            id: this.uuid(),
            name: group.name + 'copy',
            position: {
              x: group.position.x + 20,
              y: group.position.y + 20,
            },
            draggable: true,
            blocks: [],
          };
          group.blocks.forEach((block: any, key: number) => {
            if (
              block.type === 'text' ||
              block.type === 'video' ||
              block.type === 'embed' ||
              block.type === 'audio' ||
              block.type === 'image'
            ) {
              copyGroup.blocks[key] = {
                id: this.uuid(),
                content: {...block.content},
                type: block.type,
                groupId: copyGroup.id,
              };
            } else if (block.type === 'choice_input') {
              copyGroup.blocks[key] = {
                groupId: copyGroup.id,
                id: this.uuid(),
                items: [],
                options:{...block.options},
                type: block.type,
              };
              let Length = block.items.length;
              for (let index = 0; index < Length; index++) {
                copyItemField = block.items[index];
                copyGroup.blocks[key].items.push(copyItemField);
                copyGroup.blocks[key].items[index]={
                  id : this.uuid(),
                  content:copyItemField.content,
                  blockId:copyItemField.blockId,
                  type:0
                }
                let itemId = copyGroup.blocks[key].items[index].id;
                this.manageNode('item-' + itemId, ['Right'], 'block')
              }
            } else {
              copyGroup.blocks[key] = {
                groupId: block.groupId,
                id: this.uuid(),
                options: block.options,
                type: block.type,
              };
              copyGroup.blocks[key].options= {
                labels:{
                  ...block.options.labels
                },
              }
              if(copyGroup.blocks[key].options.retryMessageContent === undefined){
                copyGroup.blocks[key].options.retryMessageContent = block.options.retryMessageContent
              }
            }
          });
        }
      });
      this.groupBlocks.push(copyGroup);
      var lastEle = this.groupBlocks[this.groupBlocks.length - 1];
      this.manageNode(lastEle.id, ['Right'], 'group');
      this.manageNode(
        'be-' + copyGroup.blocks[copyGroup.blocks.length - 1].id,
        ['Right'],
        'block'
      );
    } else if (type === 'block') {
      Groups.forEach((group: any, key: number) => {
        group.blocks.forEach((block: any, key: any) => {
          if ('block-' + block.id === id) {
            if (
              block.type === 'text' ||
              block.type === 'video' ||
              block.type === 'embed' ||
              block.type === 'audio' ||
              block.type === 'image'
            ) {
              copyBlock = {
                groupId: block.groupId,
                id: this.uuid(),
                content: {
                  ...block.content
                },
                type: block.type,
              };
            } else if (block.type === 'choice_input') {
              this._removeEndPoint('be-' + block.id);
              block.items.forEach((item:any)=>{
                this._removeEndPoint('item-' + item.id);
              })
              copyBlock = {
                groupId: block.groupId,
                id: this.uuid(),
                items: [],
                options:{
                  ...block.options
                },
                type: block.type,
              };
              let Length = block.items.length;
              for (let index = 0; index < Length; index++) {
                copyItemField = block.items[index];
                group.blocks[key].items[index]={
                  id : this.uuid(),
                  content:copyItemField.content,
                  blockId:copyItemField.blockId,
                  type:0
                }
                let itemId = group.blocks[key].items[index].id;
                this.manageNode('item-' + itemId, ['Right'], 'block')
              }
            }else {
              copyBlock = {
                groupId: block.groupId,
                id: this.uuid(),
                options: {
                  ...block.options
                },
                type: block.type,
              };
              copyBlock.options= {
                labels:{
                  ...block.options.labels
                },
              }
              if(copyBlock.options.retryMessageContent === undefined){
                copyBlock.options.retryMessageContent = block.options.retryMessageContent
              }
            }
            group.blocks.push(copyBlock);
            this.rearrangeEndPoints(group.blocks, key, false);
          }
        });
      });
    } else if (type === 'itemField') {
      Groups.forEach((group: any, key: number) => {
        group.blocks.forEach((block: any, key: any) => {
          if (block.type === 'choice_input') {
            block.items.forEach((item: any) => {
              if ('itemField-' + item.id === id) {
                copyItemField = {
                  blockId: item.blockId,
                  id: this.uuid(),
                  content: item.content,
                  type: 0,
                };
                block.items.push(copyItemField);
                this.manageNode('item-' + copyItemField.id, ['Right'], 'block')
              }
            });
          }
        });
      });
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
        this._removeEndPoint('item-'+id);
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
    this.saveFlow = true;
    setTimeout(() => {
      this.saveFlow = false;
    }, 1000);
    this.redoArray = [];
    this.savePoppedEle = [];
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

  saveUserActions = (type: string, groupBlockEdge: any, reference: string) => {
    if (type === 'group' || type === 'block') {
      let data = {
        type: type,
        id: groupBlockEdge,
        text: reference,
      };
      this.savePoppedEle.push(data);
    }
    this.replayActive(this.typebot, this.savePoppedEle);
  };

  replayActive(typeBot: any, saveArray: any) {
    this.collectTypeBot = typeBot;
    this.collectSavedArray = saveArray;
  }

  undoBtnFunction(typeBot: any, undoBtn: any, saveArray: any) {
    let popElementId: any;
    if (saveArray.length > 0) {
      popElementId = saveArray.splice(-1);
      if (popElementId[0].type === 'group') {
        if (popElementId[0].text === 'dragged') {
          typeBot.groups.forEach((group: any, key: any) => {
            if (popElementId[0].id === group.id) {
              let a = typeBot.groups.splice(key, 1);
              this.instance.removeGroup(group.id);
              this.redoArray.push(a[0]);
            }
          });
        } else {
          let oldGroup = this.oldGroup.splice(-1);
          this.groupBlocks.push(oldGroup[0]);
          this.manageNode(oldGroup[0].id, ['Right'], 'group');
          this.manageNode(
            `be-${oldGroup[0].blocks[oldGroup[0].blocks.length - 1].id}`,
            ['Right'],
            'block'
          );
          this.redoArray.forEach((redo: any) => {
            if (oldGroup[0].id !== redo.id) {
              this.redoArray.push(oldGroup[0]);
            } else {
              return;
            }
          });
          // console.log(this.redoArray);
        }
      } else if (popElementId[0].type === 'edge') {
        this.redoArray.push(popElementId[0]);
        this.deleteConnection(popElementId[0].source);
      } else if (popElementId[0].type === 'block') {
        if (popElementId[0].text === 'dragged') {
          typeBot.groups.forEach((group: any) => {
            group.blocks.forEach((block: any, key: any) => {
              if (popElementId[0].id === block.id) {
                let a = group.blocks.splice(key, 1);
                this.redoArray.push(a[0]);
                return;
              }
            });
          });
        } else {
        }
      } else {
        console.log('Invalid element access');
      }
      const redo = <any>document.querySelector('#redoBtn');
      this.removeRedoBtnStyle(redo);
    } else {
      this.addUndoBtnStyle(undoBtn);
    }
  }

  redoBtnFunction() {
    const redo = <any>document.querySelector('#redoBtn');
    const undo = <any>document.querySelector('#undoBtn');
    if (this.redoArray.length > 0) {
      let a = this.redoArray.splice(-1);
      if (a[0].name !== undefined && a[0].blocks.length > 0) {
        this.typebot.groups.push(a[0]);
        let data = {
          type: 'group',
          id: a[0].id,
          text: 'dragged',
        };
        // this.manageNode(a[0].id, ['Right'], 'group');
        this.manageNode(
          `be-${a[0].blocks[a[0].blocks.length - 1].id}`,
          ['Right'],
          'block'
        );
        this.savePoppedEle.push(data);
        this.removeUndoBtnStyle(undo);
      } else if (a[0].type === 'edge') {
        this.instance.connect({
          source: document.getElementById(a[0].source),
          target: document.getElementById(a[0].target),
          anchors: ['Right', 'ContinuousLeft'],
          endpoints: [
            this.sourceEndpoint.endpoint,
            this.targetEndpoint.endpoint,
          ],
          endpointStyles: [
            this.sourceEndpoint.paintStyle,
            this.targetEndpoint.paintStyle,
          ],

          deleteEndpointsOnDetach: true,
          scope: 'jsplumb_defaultscope',
          redrop: 'any',
        });
      } else {
        let data = {
          type: 'block',
          id: a[0].id,
          text: 'dragged',
        };
        this.typebot.groups.forEach((group: any) => {
          if (group.id === a[0].groupId) {
            // this.manageNode(
            //   'be-' + group.blocks[group.blocks.length - 1].id,
            //   ['Right'],
            //   'block'
            // );
            group.blocks.push(a[0]);
          }
        });
        this.savePoppedEle.push(data);
      }
    } else {
      this.addRedoBtnStyle(redo);
    }
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

  editorSettingsToggle() {
    this.editorSettings = !this.editorSettings;
  }

  /* Stripe Modal Fields Validation */
  checkStripeField(){
    const account = document.getElementById('account') as HTMLInputElement;
    const pkTest = document.getElementById('pk_test') as HTMLInputElement;
    const skTest = document.getElementById('sk_test') as HTMLInputElement;
    const pkLive = document.getElementById('pk_live') as HTMLInputElement;
    const skLive = document.getElementById('sk_live') as HTMLInputElement;

    let ele = document.getElementById('connect_stripe_btn') as HTMLInputElement;
    let check = false;

    if(account.value != '' && pkTest.value != '' && skTest.value != '' && pkLive.value != '' && skLive.value != ''){
      check = true;
    }else{
      check = false;
    }

    if(check){
      ele.classList.remove('bg-opacity-50');
      ele.removeAttribute('disabled');
    }else{
      ele.classList.add('bg-opacity-50');
      ele.setAttribute('disabled','disabled');
    }
  }
}
