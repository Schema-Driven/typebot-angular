import {
  Component,
  AfterViewInit,
  Renderer2,
  ElementRef,
  OnDestroy,
  OnInit,
} from '@angular/core';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
  copyArrayItem,
} from '@angular/cdk/drag-drop';
import { jsPlumb } from 'jsplumb';
import { Item } from './item';

export interface Block {
  id: number | string;
  name?: string;
  position?: any;
  endpoint?: any;
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
  // @HostListener('document:mousemove', ['$event'])
  // onMouseMove(e : any) {
  //   console.log(e);
  //   var left = e.offsetX;
  //   var top = e.offsetY;
  //   $(endpoint.canvas).css({"left":left, "top":top});
  //   $(document).unbind("mousemove.adjust");
  // }

  constructor(private renderer: Renderer2, private elementRef: ElementRef) {
    this.parentItem = new Item({ name: 'parent-item' });
  }

  //addArray Method st

  public parentItem: Item;
  public itm?: Item;
  public get dragDisabled(): boolean {
    return !this.parentItem;
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
  bubbles: any[] = [
    {
      id: (Math.random() * 10000000).toFixed(0).toString(),
      name: 'Text',
      position: {
        x: 320,
        y: 120,
      },
      svg: `assets/svgs/text.svg`,
    },
    {
      id: (Math.random() * 10000000).toFixed(0).toString(),
      name: 'Image',
      position: {
        x: 320,
        y: 120,
      },
      svg: `assets/svgs/image.svg`,
    },
    {
      id: (Math.random() * 10000000).toFixed(0).toString(),
      name: 'Video',
      position: {
        x: 320,
        y: 120,
      },
      svg: `assets/svgs/video.svg`,
    },
    {
      id: (Math.random() * 10000000).toFixed(0).toString(),
      name: 'Embed',
      position: {
        x: 320,
        y: 120,
      },
      svg: `assets/svgs/embed.svg`,
    },
  ];

  inputs: any[] = [
    {
      id: (Math.random() * 10000000).toFixed(0).toString(),
      name: 'Text',
      position: {
        x: 320,
        y: 120,
      },
      svg: `assets/svgs/input-text.svg`,
    },
    {
      id: (Math.random() * 10000000).toFixed(0).toString(),
      name: 'Number',
      position: {
        x: 320,
        y: 120,
      },
      svg: `assets/svgs/input-number.svg`,
    },
    {
      id: (Math.random() * 10000000).toFixed(0).toString(),
      name: 'Email',
      position: {
        x: 320,
        y: 120,
      },
      svg: `assets/svgs/input-email.svg`,
    },
    {
      id: (Math.random() * 10000000).toFixed(0).toString(),
      name: 'Website',
      position: {
        x: 320,
        y: 120,
      },
      svg: `assets/svgs/input-website.svg`,
    },
    {
      id: (Math.random() * 10000000).toFixed(0).toString(),
      name: 'Date',
      position: {
        x: 320,
        y: 120,
      },
      svg: `assets/svgs/input-date.svg`,
    },
    {
      id: (Math.random() * 10000000).toFixed(0).toString(),
      name: 'Phone',
      position: {
        x: 320,
        y: 120,
      },
      svg: `assets/svgs/input-phone.svg`,
    },
    {
      id: (Math.random() * 10000000).toFixed(0).toString(),
      name: 'Button',
      position: {
        x: 320,
        y: 120,
      },
      svg: `assets/svgs/input-button.svg`,
    },
    {
      id: (Math.random() * 10000000).toFixed(0).toString(),
      name: 'Payment',
      position: {
        x: 320,
        y: 120,
      },
      svg: `assets/svgs/input-payment.svg`,
    },
  ];

  toolbar: any[] = [
    {
      id: (Math.random() * 10000000).toFixed(0).toString(),
      name: 'Text',
      position: {
        x: 320,
        y: 120,
      },
      svg: `assets/svgs/text.svg`,
    },
    {
      id: (Math.random() * 10000000).toFixed(0).toString(),
      name: 'Image',
      position: {
        x: 320,
        y: 120,
      },
      svg: `assets/svgs/image.svg`,
    },
    {
      id: (Math.random() * 10000000).toFixed(0).toString(),
      name: 'Video',
      position: {
        x: 320,
        y: 120,
      },
      svg: `assets/svgs/video.svg`,
    },
    {
      id: (Math.random() * 10000000).toFixed(0).toString(),
      name: 'Embed',
      position: {
        x: 320,
        y: 120,
      },
      svg: `assets/svgs/embed.svg`,
    },
  ];

  logics: any[] = [
    {
      id: (Math.random() * 10000000).toFixed(0).toString(),
      name: 'Set variable',
      position: {
        x: 320,
        y: 120,
      },
      svg: `assets/svgs/logic-variable.svg`,
    },
    {
      id: (Math.random() * 10000000).toFixed(0).toString(),
      name: 'Condition',
      position: {
        x: 320,
        y: 120,
      },
      svg: `assets/svgs/logic-condition.svg`,
    },
    {
      id: (Math.random() * 10000000).toFixed(0).toString(),
      name: 'Redirect',
      position: {
        x: 320,
        y: 120,
      },
      svg: `assets/svgs/logic-redirect.svg`,
    },
    {
      id: (Math.random() * 10000000).toFixed(0).toString(),
      name: 'Code',
      position: {
        x: 320,
        y: 120,
      },
      svg: `assets/svgs/logic-code.svg`,
    },
    {
      id: (Math.random() * 10000000).toFixed(0).toString(),
      name: 'Typebot',
      position: {
        x: 320,
        y: 120,
      },
      svg: `assets/svgs/logic-typebot.svg`,
    },
  ];

  integerations: any[] = [
    {
      id: (Math.random() * 10000000).toFixed(0).toString(),
      name: 'Webhook',
      position: {
        x: 320,
        y: 120,
      },
      svg: `assets/svgs/integeration-webhook.svg`,
    },
    {
      id: (Math.random() * 10000000).toFixed(0).toString(),
      name: 'Email',
      position: {
        x: 320,
        y: 120,
      },
      svg: `assets/svgs/integeration-email.svg`,
    },
  ];

  blocks: Block[] = [
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

  registerEndpoints() {
    this.blocks.map((b) => {
      let index = this.endpoints.findIndex((e) => e.identifier == b.id);
      if (index === -1) {
        let block = document.getElementById(b.id.toString());
        // console.log('Attaching endpoint to block', block);
        this.endpoints.push({
          identifier: b.id.toString(),
          instance: this.jsPlumbInstance.addEndpoint(
            b.id.toString(),
            {
              anchor: [
                'Continuous',
                { faces: ['top', 'left', 'right', 'bottom'] },
              ],
              maxConnections: 99999,
            },
            { isSource: true, isTarget: true }
          ),
        });
        this.jsPlumbInstance.draggable(b.id.toString());
      }
    });

    this.jsPlumbInstance.bind(
      'endpointClick',
      function (endpoint: any, originalEvent: any) {
        // console.log(endpoint, originalEvent);
      }
    );
    this.jsPlumbInstance.bind(
      'mouseup',
      function (endpoint: any, originalEvent: any) {
        // console.log(endpoint, originalEvent);
      }
    );

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

  drop(event: CdkDragDrop<any[]>) {
    // console.log('before drop', this.blocks);
    // console.warn('toolbar dropped');
    // console.log(event);
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      this.blocks.push({
        ...this.toolbar[event.previousIndex],
        id: Math.random(),
        position: {
          x: event.dropPoint.x,
          y: event.dropPoint.y,
        },
        endpoint: {
          canvas: null,
        },
      });
      setTimeout(() => {
        this.registerEndpoints();
      }, 100);
      // console.log('after drop', this.blocks);
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
}
