import { Component, AfterViewInit, HostListener,Renderer2,ElementRef, OnDestroy, OnInit } from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem, copyArrayItem} from '@angular/cdk/drag-drop';
import { jsPlumb } from 'jsplumb';

export interface Block {
  id : number | string,
  name ?: string,
  position ?: any,
  endpoint ?: any
}

export interface Endpoint {
  identifier : string,
  instance : any,
}

@Component({
  selector: 'editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
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

  constructor(
    private renderer: Renderer2, 
    private elementRef: ElementRef
  ){}

  removeEventListener: any

  DocumentMouseMoveEventListener : any

  jsPlumbInstance :any;
  showConnectionToggle = false;
  buttonName = 'Connect';

  // var endpointOptions = { isSource: true, isTarget: true };
  // var d1 = jsPlumb.addEndpoint( $('#m1'), { anchor: "LeftMiddle" }, endpointOptions );
  // var d2 = jsPlumb.addEndpoint( $('#m2'), { anchor: "LeftMiddle" }, endpointOptions );

  endpoints : any[] = []
  toolbar :any[] = []

  blocks : Block[] = [
    {
      id: 0,
      name: 'start',
      position : {
        x : 420,
        y : 120,
      },
      endpoint : {
        canvas : null
      }
    }
  ]

  ngOnInit(): void {
      ['Text','Image','Video','Embed'].forEach(text => {
        this.toolbar.push({
          id : (Math.random() * 10000000).toFixed(0).toString(),
          name : text,
          position : {
            x : 320,
            y : 120,
          },
        })
      });
  }

  registerEndpoints(){
    this.blocks.map((b)=>{
      
      let index = this.endpoints.findIndex(e => e.identifier == b.id);
      if(index === -1){
        let block = document.getElementById(b.id.toString());
        console.log('Attaching endpoint to block',block);
        this.endpoints.push({
          identifier : b.id.toString(),
          instance : this.jsPlumbInstance.addEndpoint(
            b.id.toString(), 
            { anchor:"Continuous",maxConnections: 30, },
            { isSource: true, isTarget: true }
          )
        });
        this.jsPlumbInstance.draggable(b.id.toString());
      }

      
    });

    this.jsPlumbInstance.bind("endpointClick", function(endpoint :any , originalEvent :any) {
      console.log(endpoint,originalEvent)
    });
    this.jsPlumbInstance.bind("mouseup", function(endpoint :any , originalEvent :any){
      console.log(endpoint,originalEvent)
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
      Container:'block-container',
      Connector:[
        'Flowchart',
        { stub: [212, 67], cornerRadius: 5, alwaysRespectStubs: true },
      ],
      PaintStyle : {
        strokeWidth:2,
        stroke: '#9CA3AF'
      },
      DragOptions : { cursor: "crosshair" },
      Endpoints : [ [ "Dot", { radius:4, cssClass:'connectingConnectorLabel' } ], [ "Dot", { radius:11 } ] ],
      ConnectionOverlays: [
        [ "Arrow", { width:15, length:15, location:1, id:"arrow" } ],
        [
          'Label',
          {
            location: 0.5,
            cssClass: 'connectingConnectorLabel',
          },
        ],
      ]
    });
    this.registerEndpoints();
    console.log('blocks',this.blocks)
  }
  
  positioning(event : any,id : any){
    //console.log(event);
    let index = this.blocks.findIndex(b => b.id == id);
    if(index !== -1){
      this.blocks[index].position.x = event.pointerPosition.x -40
      this.blocks[index].position.y = event.pointerPosition.y -40
    }
  }

  endpointMouseDown(eventMouseDown: any){
    let endpoint_id = eventMouseDown.target.getAttribute('id');
    let block_id = endpoint_id.split('-')[endpoint_id.split('-').length-1];
    console.warn("the user mouseDown on endpoint.")
    console.log(this.blocks[block_id].endpoint);
    console.log(eventMouseDown);
    this.DocumentMouseMoveEventListener = this.renderer.listen('document', 'mousemove', (eventMouseMove) => {
      eventMouseMove.preventDefault();
      console.log('movement',eventMouseMove);
      var left = eventMouseMove.offsetX;
      var top = eventMouseMove.offsetY;

      this.blocks[block_id].endpoint.canvas.style.left = left;
      this.blocks[block_id].endpoint.canvas.style.top = top;

      console.log('endpoint_canvas',{
       top : this.blocks[block_id].endpoint.canvas.style.top,
       left: this.blocks[block_id].endpoint.canvas.style.left 
      });
      //this.removeEventListener();
      //$(endpoint.canvas).css({"left":left, "top":top});  
    });

    // this.blocks[block_id].endpoint.dispatchEvent(eventMouseDown);

    this.removeEventListener = this.renderer.listen('document', 'mouseup', (eventMouseUp) => {
      eventMouseUp.preventDefault();
      console.log('mouseUp',eventMouseUp);
      this.DocumentMouseMoveEventListener();
    });
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
        endpoint : {
          canvas : null
        }
      });
      setTimeout(()=>{
        this.registerEndpoints();
      },100);
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
    // let id = event.source.element.nativeElement.getAttribute('id');
    // let index = this.blocks.findIndex(b => b.id.toString() === id );
    // if(index != -1){
    //   this.blocks[index].state.dragging = false;
    //   console.log('id : '+id.toString()+ ' is start dragging')
    // }
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
    console.warn("the user is dragging the item. Use with caution, because this event will fire for every pixel that the user has dragged.")
    console.log(event)
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
      deleteEndpointsOnDetach:false,
      anchor: ["Right"],
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

  public ngOnDestroy() {
    this.removeEventListener();
  }
}