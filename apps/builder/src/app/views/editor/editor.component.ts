import {
  Component,
  AfterViewInit,
  Renderer2,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import {
  CdkDragDrop,
  CdkDragEnter,
  CdkDragMove,
  moveItemInArray,
  transferArrayItem,
  copyArrayItem,
} from '@angular/cdk/drag-drop';
import { jsPlumb } from 'jsplumb';
import { Item } from './item';

export interface Block {
  id: number;
  uuid: string;
  name?: string;
  svg?: string;
  position?: any;
  endpoint?: any;
  rendered: boolean;
  blocks?: Block[];
}

export interface StructuredBlock {
  id: number;
  uuid: string;
  name?: string;
  position?: any;
  svg?: string;
}

export interface GroupStructuredBlock {
  uuid: string;
  name: string;
  blocks: StructuredBlock[];
}

export interface GroupRendered {
  id: number;
  draggable: boolean;
  uuid: string;
  name: string;
  position: any;
  blocks: Block[];
}

export interface Endpoint {
  identifier: string;
  instance: any;
}

@Component({
  selector: 'editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css'],
})
export class EditorComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('dropListContainer') dropListContainer?: ElementRef;
  dropListReceiverElement?: HTMLElement;
  constructor(private renderer: Renderer2, private elementRef: ElementRef) {
    this.parentItem = new Item({ name: 'parent-item' });
  }
  dragDropInfo?: {
    dragIndex: number;
    dropIndex: number;
  };
  public items: Array<number> = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
  public parentItem: Item;
  public itm?: Item;
  public get dragDisabled(): boolean {
    return !this.parentItem;
  }

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

  public get dragDisabledItem(): boolean {
    return !this.itm;
  }

  public get parentItemId(): string {
    return this.dragDisabled ? '' : this.parentItem.uId;
  }

  public get connectedDropListsIds(): string[] {
    // We reverse ids here to respect items nesting hierarchy
    return this.getIdsRecursive(this.parentItem).reverse();
  }
  public allDropListsIds?: string[];

  public onDragDrop(event: any) {
    event.container.element.nativeElement.classList.remove('active');
    if (this.canBeDropped(event)) {
      const movingItem: Item = event.item.data;
      event.container.data.children.push(movingItem);
      event.previousContainer.data.children =
        event.previousContainer.data.children.filter();
    } else {
      moveItemInArray(
        event.container.data.children,
        event.previousIndex,
        event.currentIndex
      );
    }
  }

  private getIdsRecursive(item: Item): string[] {
    let ids = [item.uId];
    item.children.forEach((childItem) => {
      ids = ids.concat(this.getIdsRecursive(childItem));
    });
    return ids;
  }

  private canBeDropped(event: CdkDragDrop<Item, Item>): boolean {
    const movingItem: Item = event.item.data;

    return (
      event.previousContainer.id !== event.container.id &&
      this.isNotSelfDrop(event) &&
      !this.hasChild(movingItem, event.container.data)
    );
  }

  private isNotSelfDrop(event: any): boolean {
    return event.container.data.uId !== event.item.data.uId;
  }

  private hasChild(parentItem: Item, childItem: Item): boolean {
    const hasChild = parentItem.children.some(
      (item) => item.uId === childItem.uId
    );
    return hasChild
      ? true
      : parentItem.children.some((item) => this.hasChild(item, childItem));
  }

  //addArray End

  removeEventListener: any;
  DocumentMouseMoveEventListener: any;

  jsPlumbInstance: any;
  showConnectionToggle = false;
  buttonName = 'Connect';
  deg: number = 3;

  endpoints: any[] = [];

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

  blocks: any[] = [
    {
      id: 0,
      name: 'start',
      position: {
        x: 420,
        y: 120,
      },
      endpoint: {
        canvas: null,
      },
    },
  ];

  groupRenderedBlocks: GroupRendered[] = [
    {
      id: parseFloat((Math.random() * 10000000).toFixed(0)),
      draggable: true,
      uuid: this.uuid(),
      name: 'Start',
      position: {
        x: 420,
        y: 120,
      },
      blocks: [],
    },
  ];

  sidePanel: boolean = false;
  sidePanelClick() {
    console.log('Side Panel Click', this.sidePanel);
    this.sidePanel = !this.sidePanel;
  }

  addArray: boolean = false;
  popup = false;

  ngOnInit(): void {
    this.parentItem.children.push(
      new Item({
        name: 'test1',
        children: [
          new Item({ name: 'subItem1' }),
          new Item({ name: 'subItem2' }),
          new Item({ name: 'subItem3' }),
        ],
      })
    );
    this.parentItem.children.push(
      new Item({
        name: 'test2',
        children: [
          new Item({ name: 'subItem4' }),
          new Item({ name: 'subItem5' }),
          new Item({
            name: 'subItem6',
            children: [new Item({ name: 'subItem8' })],
          }),
        ],
      })
    );
    this.parentItem.children.push(new Item({ name: 'test3' }));
    console.log(this.parentItem);
  }

  structuredBlocksConnector() {
    return this.structuredBlocks.map((sb) => sb.uuid);
  }

  receiverOriginatorBlocksConnector(group_id: number) {
    let renderedGrouped = this.groupRenderedBlocks.find(
      (gr) => gr.id === group_id
    );
    if (renderedGrouped !== undefined) {
      return renderedGrouped.blocks.map((b) => b.uuid);
    }
    return [];
  }

  allReceiverOriginatorBlocksConnector() {
    let structredblocks_ids = this.structuredBlocksConnector();
    let group_ids = this.groupRenderedBlocks.map((gr) => gr.uuid);
    group_ids.push(...structredblocks_ids);
    return group_ids;
  }

  registerEndpoints() {
    this.groupRenderedBlocks.map((gr) => {
      let index = this.endpoints.findIndex((e) => e.identifier == gr.id);
      if (index === -1) {
        let block = document.getElementById(gr.id.toString());
        // console.log('Attaching endpoint to block', block);

        this.endpoints.push({
          identifier: gr.id.toString(),
          instance: this.jsPlumbInstance.addEndpoint(
            gr.id.toString(),
            {
              anchor: [0, 0, 0, 0, 0, 30, 'outline'],
              maxConnections: 99999,
              Class: 'fooColor',
            },
            { isTarget: true }
            // { cssClass: "fooColor" },
          ),
        });

        this.endpoints.push({
          identifier: gr.id.toString(),
          instance: this.jsPlumbInstance.addEndpoint(
            gr.id.toString(),
            {
              anchor: [1, 1, 1, 0, 0, -45, 'outline'],
              connectorOverlays: [
                [
                  'Arrow',
                  {
                    width: 30,
                    length: 30,
                    location: 1,
                    id: 'arrow',
                  },
                ],
              ],
              maxConnections: 99999,
              Class: 'fooColor',
              ports: {
                default: {
                  paintStyle: { fill: '#f76258' }, // the endpoint's appearance
                  hoverPaintStyle: { fill: '#434343' }, // appearance when mouse hovering on endpoint or connection
                  edgeType: 'common', // the type of edge for connections from this port type
                  maxConnections: -1, // no limit on connections
                  dropOptions: {
                    //drop options for the port. here we attach a css class.
                    hoverClass: 'drop-hover',
                  },
                  events: {
                    dblclick: (p: any) => {
                      console.log(p);
                    },
                  },
                },
              },
            },
            { isSource: true }
          ),
        });

        this.jsPlumbInstance.draggable(gr.id.toString());
      }
    });

    this.jsPlumbInstance.bind(
      'endpointClick',
      function (endpoint: any, originalEvent: any) {
        console.log(endpoint, originalEvent);
      }
    );
    this.jsPlumbInstance.bind(
      'mouseup',
      function (endpoint: any, originalEvent: any) {
        console.log(endpoint, originalEvent);
      }
    );
    this.jsPlumbInstance.connect({
      connector: [
        'Flowchart',
        { stub: [212, 67], cornerRadius: 1, alwaysRespectStubs: true },
      ],
      source: 'Source',
      target: 'Target1',
      anchor: ['Right', 'Left'],
      paintStyle: { stroke: '#456', strokeWidth: 4, cssClass: 'outline' },
      overlays: [['svg', { location: 0.5, cssClass: 'fooColor' }]],
    });

    // this.jsPlumbInstance.bind('beforeDrop', (params : any) => {
    //   this.jsPlumbInstance.getConnections().map((connection : any) => {
    //     if (connection.targetId === params.targetId && connection.sourceId === params.sourceId) {
    //       this.jsPlumbInstance.addConnection(connection);
    //     }
    //   });
    // });
  }

  ngAfterViewInit() {
    this.jsPlumbInstance = jsPlumb.getInstance({
      Container: 'block-container',
      Connector: [
        'Flowchart',
        { stub: [212, 67], cornerRadius: 5, alwaysRespectStubs: true },
      ],
      PaintStyle: {
        strokeWidth: 2,
        stroke: '#9CA3AF',
      },
      DragOptions: { cursor: 'crosshair' },
      Endpoints: [
        ['Dot', { radius: 4, cssClass: 'connectingConnectorLabel' }],
        ['Dot', { radius: 11, cssClass: 'connectingConnectorLabel' }],
      ],
      ConnectionOverlays: [
        ['Arrow', { width: 15, length: 15, location: 1, id: 'arrow' }],
        [
          'Label',
          {
            location: 0.5,
            cssClass: 'connectingConnectorLabel',
          },
        ],
      ],
    });
    // this.jsPlumbInstance.setContainer({
    //   container: 'block-container'
    // })
    this.registerEndpoints();
    // console.log('blocks', this.blocks);
  }

  positioning(event: any, id: any) {
    //console.log(event);
    let index = this.blocks.findIndex((b) => b.id == id);
    if (index !== -1) {
      this.blocks[index].position.x = event.pointerPosition.x - 40;
      this.blocks[index].position.y = event.pointerPosition.y - 40;
    }
  }

  endpointMouseDown(eventMouseDown: any) {
    let endpoint_id = eventMouseDown.target.getAttribute('id');
    let block_id = endpoint_id.split('-')[endpoint_id.split('-').length - 1];
    console.warn('the user mouseDown on endpoint.');
    // console.log(this.blocks[block_id].endpoint);
    // console.log(eventMouseDown);
    this.DocumentMouseMoveEventListener = this.renderer.listen(
      'document',
      'mousemove',
      (eventMouseMove) => {
        eventMouseMove.preventDefault();
        // console.log('movement', eventMouseMove);
        var left = eventMouseMove.offsetX;
        var top = eventMouseMove.offsetY;

        this.blocks[block_id].endpoint.canvas.style.left = left;
        this.blocks[block_id].endpoint.canvas.style.top = top;

        // console.log('endpoint_canvas', {
        //   top: this.blocks[block_id].endpoint.canvas.style.top,
        //   left: this.blocks[block_id].endpoint.canvas.style.left,
        // });
        //this.removeEventListener();
        //$(endpoint.canvas).css({"left":left, "top":top});
      }
    );

    // this.blocks[block_id].endpoint.dispatchEvent(eventMouseDown);

    this.removeEventListener = this.renderer.listen(
      'document',
      'mouseup',
      (eventMouseUp) => {
        eventMouseUp.preventDefault();
        // console.log('mouseUp', eventMouseUp);
        this.DocumentMouseMoveEventListener();
      }
    );
  }

  draggable(element_id: string | number, draggable: boolean) {
    console.log(element_id), draggable;

    let index = this.groupRenderedBlocks.findIndex(
      (gr) => gr.id === element_id
    );
    if (index !== -1) {
      let f = this.groupRenderedBlocks[index].draggable;
      console.log({
        element_id,
        draggable,
        index,
        groupRenderedBlocks: f,
      });
      this.jsPlumbInstance.setDraggable(
        [document.getElementById(element_id.toString())],
        draggable
      );
      this.groupRenderedBlocks[index].draggable = draggable;
    }
  }

  drop(event: CdkDragDrop<any[]>, container: string) {
    console.log({ event, container });
    switch (container) {
      case 'Originator':
        // do-nothing
        break;
      case 'Receiver':
        if (event.previousContainer === event.container) {
          moveItemInArray(
            event.container.data,
            event.previousIndex,
            event.currentIndex
          );
        } else {
          let lastIndex = this.groupRenderedBlocks.length;
          let nextIndex = ++lastIndex;
          this.groupRenderedBlocks.push({
            id: parseFloat((Math.random() * 10000000).toFixed(0)),
            draggable: true,
            uuid: this.uuid(),
            name: `Group # ${nextIndex}`,
            position: {
              x: event.dropPoint.x,
              y: event.dropPoint.y,
            },
            blocks: [
              {
                ...event.previousContainer.data[event.previousIndex],
                id: parseFloat((Math.random() * 10000000).toFixed(0)),
                position: {
                  x: event.dropPoint.x,
                  y: event.dropPoint.y,
                },
                endpoint: {
                  canvas: null,
                },
              },
            ],
          });

          setTimeout(() => {
            this.registerEndpoints();
          }, 100);
        }
        break;
      case 'ReceiverOriginator':
        transferArrayItem(
          event.previousContainer.data,
          event.container.data,
          event.previousIndex,
          event.currentIndex
        );
        if (event.previousContainer.data.length == 0) {
          let index = this.groupRenderedBlocks.findIndex(
            (gr) => gr.uuid === event.previousContainer.id
          );
          if (index !== -1) {
            this.endpoints
              .filter((e) => e.identifier == this.groupRenderedBlocks[index].id)
              .forEach((endpoint) => {
                console.log({ endpoint });
                this.jsPlumbInstance.deleteEndpoint(endpoint.instance);
              });
            this.groupRenderedBlocks.splice(index, 1);
          }
        }
        break;
    }
  }

  // Emits when the user drops the item inside a container.
  cdkDragDropped(event: any) {
    // console.warn('the user drops the item inside a container.');
    // console.log(event);
  }

  // Emits when the user stops dragging an item in the container.
  cdkDragEnded(event: any) {
    // console.warn('the user stops dragging an item in the container.');
    // console.log(event);
    // let id = event.source.element.nativeElement.getAttribute('id');
    // let index = this.blocks.findIndex(b => b.id.toString() === id );
    // if(index != -1){
    //   this.blocks[index].state.dragging = false;
    //   console.log('id : '+id.toString()+ ' is start dragging')
    // }
  }

  // Emits when the user has moved the item into a new container.
  cdkDragEntered(event: any) {
    console.warn('the user has moved the item into a new container.');
    // console.log(event);
  }

  // Emits when the user removes the item its container by dragging it into another container.
  cdkDragExited(event: any) {
    console.warn(
      'the user removes the item its container by dragging it into another container.'
    );
    // console.log(event);
  }

  // Emits as the user is dragging the item. Use with caution, because this event will fire for every pixel that the user has dragged.
  cdkDragMoved(event: any, id: any) {
    console.warn(
      'the user is dragging the item. Use with caution, because this event will fire for every pixel that the user has dragged.'
    );
    // console.log(event);
    this.positioning(event, id);
    this.jsPlumbInstance.repaintEverything();
  }

  // Emits when the user has released a drag item, before any animations have started.
  cdkDragReleased(event: any) {
    console.warn(
      'the user has released a drag item, before any animations have started.'
    );
    // console.log(event);
    // event.source.element.nativeElement.classList.remove('bg-slate-100')
    // event.source.element.nativeElement.classList.add('bg-white')
  }

  // Emits when the user starts dragging the item.
  cdkDragStarted(event: any) {
    console.warn('the user starts dragging the item.');
    // console.log(event);
    event.source._dragRef._initialTransform = `rotate(${this.deg}deg)`;
    // let id = event.source.element.nativeElement.getAttribute('id');
    // let index = this.blocks.findIndex(b => b.id.toString() === id );
    // if(index != -1){
    //   this.blocks[index].state.dragging = true;
    //   console.log('id : '+id.toString()+ ' is start dragging')
    // }
  }

  connectSourceToTargetUsingJSPlumb() {
    this.jsPlumbInstance.connect({
      connector: [
        'Flowchart',
        { stub: [212, 67], cornerRadius: 1, alwaysRespectStubs: true },
      ],
      source: '200',
      target: '300',
      deleteEndpointsOnDetach: false,
      anchor: ['Right'],
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

  manageZoom(instance: any, listeningArea: any, elementToZoom: any) {
    var minZoom = 0.2,
      maxZoom = 2.0,
      zoomStep = 0.1;
    var zoom = 1.0;

    // From jsPlumb documentation
    var zoomPlumb = function (
      zoom: any,
      instance: any,
      transformOrigin: any,
      element: any
    ) {
      transformOrigin = transformOrigin || [0.5, 0.5];
      instance = instance || jsPlumb;
      element = element || instance.getContainer();

      var vendors = ['webkit-', 'moz-', 'ms-', 'o-', ''],
        scale = 'scale(' + zoom + ')',
        origin =
          transformOrigin[0] * 100 + '% ' + transformOrigin[1] * 100 + '%';

      vendors.map(function (v) {
        element.style[v + 'transform'] = scale;
        element.style[v + 'transform-origin'] = origin;
      });

      instance.setZoom(zoom);
    };

    document
      .getElementById(listeningArea)
      ?.addEventListener('wheel', function (event: any) {
        var delta =
          event.originalEvent.wheelDelta > 0 || event.originalEvent.detail < 0
            ? 1
            : -1;
        var offsetX = 0,
          offsetY = 0,
          boundingRect;

        zoom = Math.max(minZoom, Math.min(maxZoom, zoom + zoomStep * delta));
        boundingRect = listeningArea.getBoundingClientRect();
        offsetX = event.originalEvent.clientX + listeningArea.scrollLeft;
        offsetY = event.originalEvent.clientY + listeningArea.scrollTop;

        //~ 		console.log(boundingRect);
        //~ 		console.log(listeningArea.scrollWidth + " " + listeningArea.scrollHeight);
        //~ 		console.log(offsetX + " " + offsetY);
        // Not perfect...
        var origin = [
          offsetX / listeningArea.scrollWidth,
          offsetY / listeningArea.scrollHeight,
        ];
        //~ 		console.log(origin);
        zoomPlumb(zoom, instance, origin, elementToZoom);

        return false;
      });

    // Also manage dragging the background
    var mouseIsDown = false,
      clickX = 0,
      clickY = 0;
    function updateScrollPosition(e: any) {
      let element = document.getElementById(listeningArea);
      if (element) {
        element.scrollLeft = clickX - e.pageX;
        element.scrollTop = clickX - e.pageX;
      }
    }
    document
      .getElementById(listeningArea)
      ?.addEventListener('mousemove', function (e: any) {
        if (mouseIsDown) {
          updateScrollPosition(e);
        }
      });
    document
      .getElementById(listeningArea)
      ?.addEventListener('mousedown', function (e: any) {
        mouseIsDown = true;
        clickX = document.getElementById(listeningArea)?.scrollLeft + e.pageX;
        clickY = document.getElementById(listeningArea)?.scrollTop + e.pageY;
      });
    document
      .getElementById(listeningArea)
      ?.addEventListener('mouseup', function (e: any) {
        mouseIsDown = false;
      });
  }

  public ngOnDestroy() {
    //this.removeEventListener();
  }

  cdkDroptest1(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }

  dragEnteredtest1(event: CdkDragEnter<number>) {
    const drag = event.item;
    const dropList = event.container;
    const dragIndex = drag.data;
    const dropIndex = dropList.data;

    this.dragDropInfo = { dragIndex, dropIndex };

    const phContainer = dropList.element.nativeElement;
    const phElement = phContainer.querySelector('.cdk-drag-placeholder');

    if (phElement) {
      phContainer.removeChild(phElement);
      phContainer.parentElement?.insertBefore(phElement, phContainer);

      moveItemInArray(this.items, dragIndex, dropIndex);
    }
  }

  dragMovedtest1(event: CdkDragMove<number>) {
    if (!this.dropListContainer || !this.dragDropInfo) return;

    const placeholderElement =
      this.dropListContainer.nativeElement.querySelector(
        '.cdk-drag-placeholder'
      );

    const receiverElement =
      this.dragDropInfo.dragIndex > this.dragDropInfo.dropIndex
        ? placeholderElement?.nextElementSibling
        : placeholderElement?.previousElementSibling;

    if (!receiverElement) {
      return;
    }

    receiverElement.style.display = 'none';
    this.dropListReceiverElement = receiverElement;
  }

  dragDroppedtest1(event: CdkDragDrop<number>) {
    if (!this.dropListReceiverElement) {
      return;
    }

    this.dropListReceiverElement.style.removeProperty('display');
    this.dragDropInfo = undefined;
  }
}
