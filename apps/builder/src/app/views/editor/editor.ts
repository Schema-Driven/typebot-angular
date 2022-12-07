import { ElementRef } from '@angular/core';
import { GroupStructuredBlock, GroupBlock } from './editor.interfaces';
import {
  ContainmentType,
  EVENT_DRAG_STOP,
  newInstance,
} from '@jsplumb/browser-ui';
import { FlowchartConnector } from '@jsplumb/connector-flowchart';
import { AnchorLocations, AnchorSpec, AnchorOptions } from '@jsplumb/common';
import { EditorService } from '../../services/editor.service';

export function uuid() {
  var d = new Date().getTime(); //Timestamp
  var d2 =
    (typeof performance !== 'undefined' &&
      performance.now &&
      performance.now() * 1000) ||
    0; //Time in microseconds since page-load or 0 if unsupported
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
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
  });
}

export const structuredBlocks: GroupStructuredBlock[] = [
  {
    id: uuid(),
    name: 'bubbles',
    blocks: [
      {
        id: uuid(),
        content: { html: '', plainText: '' },
        type: 'text',
      },
      {
        id: uuid(),
        content: {
          url: '',
        },
        type: 'image',
      },
      {
        id: uuid(),
        content: { id: '', type: '', url: '' },
        type: 'video',
      },
      {
        id: uuid(),
        content: { url: '', height: 400 },
        type: 'embed',
      },
      {
        id: uuid(),
        content: { url: ''},
        type: 'audio',
      },
    ],
  },
  {
    id: uuid(),
    name: 'inputs',
    blocks: [
      {
        id: uuid(),
        options: {
          isLong: false,
          labels: { button: 'Send', placeholder: 'Type your answer...' },
        },
        type: 'text_input',
      },
      {
        id: uuid(),
        options: {
          labels: { button: 'Send', placeholder: 'Type a number...' },
        },
        type: 'number_input',
      },
      {
        id: uuid(),
        options: {
          labels: { button: 'Send', placeholder: 'Type your email...' },
          retryMessageContent:
            "This email doesn't seem to be valid. Can you type it again?",
        },
        type: 'email_input',
      },
      {
        id: uuid(),
        options: {
          labels: { button: 'Send', placeholder: 'Type a URL...' },
          retryMessageContent:
            "This URL doesn't seem to be valid. Can you type it again?",
        },
        type: 'url_input',
      },
      {
        id: uuid(),
        options: {
          labels: { to: 'To:', from: 'From:', button: 'Send' },
          hasTime: false,
          isRange: false,
        },
        type: 'date_input',
      },
      {
        id: uuid(),
        options: {
          labels: { button: 'Send', placeholder: 'Type your phone number...' },
          retryMessageContent:
            "This phone number doesn't seem to be valid. Can you type it again?",
        },
        type: 'phone_number_input',
      },
      {
        id: uuid(),
        items: [],
        options: {
          buttonLabel: 'Send',
          isMultipleChoice: false,
        },
        type: 'choice_input',
      },
      {
        id: uuid(),
        options: {
          currency: 'USD',
          labels: { button: 'Pay', success: 'Success' },
          providers: 'stripe',
        },
        type: 'payment_input',
      },
      {
        id: uuid(),
        options: {
          buttonTypes: 'Numbers',
          customIcon: {
            isEnabled: false,
            svg: '',
          },
          labels: {
            left: '',
            right: '',
            button: 'Send',
          },
          length: 10,
        },
        type: 'rating_input',
      },
      {
        id: uuid(),
        options: {
          labels: {
            button: 'Upload',
            placeholder:
              '<strong>Click to upload</strong> or drag and drop<br> (size limit: 10MB)',
          },
          isMultipleAllowed: false,
          isRequired: true,
          sizeLimit: 10,
        },
        type: 'file_input',
      },
    ],
  },
  // {
  //   id: uuid(),
  //   name: 'logic',
  //   blocks: [
  //     {
  //       id: uuid(),
  //       options: {},
  //       type: 'set_variable'
  //     },
  //     {
  //       id: uuid(),
  //       items: [
  //         {
  //           id: uuid(),
  //           content: {comparisons: [], logicalOperator: "AND"},
  //           type: 1
  //         }
  //       ],
  //       type: 'condition'
  //     },
  //     {
  //       id: uuid(),
  //       options: {
  //         isNewTab: false
  //       },
  //       type: 'redirect'
  //     },
  //     {
  //       id: uuid(),
  //       options: {
  //         name: "Code snippet",
  //       },
  //       type: 'code'
  //     },
  //     {
  //       id: uuid(),
  //       options: {},
  //       type: 'typebot_link'
  //     }
  //   ],
  // },
  // {
  //   id: uuid(),
  //   name: 'integerations',
  //   blocks: [
  //     {
  //       id: uuid(),
  //       options: {},
  //       type: 'webhook'
  //     },
  //     {
  //       id: uuid(),
  //       options: {},
  //       type: 'email'
  //     },
  //   ],
  // },
];

export const prefilledData: any = {
  start: {
    label: 'Start',
    svg: 'assets/svgs/flag.svg',
  },
  text: {
    label: 'Text',
    svg: 'assets/svgs/text.svg',
  },
  image: {
    label: 'Image',
    svg: 'assets/svgs/image.svg',
  },
  video: {
    label: 'Video',
    svg: 'assets/svgs/video.svg',
  },
  embed: {
    label: 'Embed',
    svg: 'assets/svgs/embed.svg',
  },
  audio: {
    label: 'Audio',
    svg: 'assets/svgs/audio.svg',
  },
  text_input: {
    label: 'Text',
    svg: 'assets/svgs/input-text.svg',
  },
  number_input: {
    label: 'Number',
    svg: 'assets/svgs/input-number.svg',
  },
  email_input: {
    label: 'Email',
    svg: 'assets/svgs/input-email.svg',
  },
  url_input: {
    label: 'Website',
    svg: 'assets/svgs/input-website.svg',
  },
  date_input: {
    label: 'Date',
    svg: 'assets/svgs/input-date.svg',
  },
  phone_number_input: {
    label: 'Phone',
    svg: 'assets/svgs/input-phone.svg',
  },
  choice_input: {
    label: 'Button',
    svg: 'assets/svgs/input-button.svg',
  },
  payment_input: {
    label: 'Payment',
    svg: 'assets/svgs/input-payment.svg',
  },
  rating_input: {
    label: 'Rating',
    svg: 'assets/svgs/star.svg',
  },
  file_input: {
    label: 'File',
    svg: 'assets/svgs/file.svg',
  },
  set_variable: {
    label: 'Set Variable',
    svg: 'assets/svgs/logic-variable.svg',
  },
  condition: {
    label: 'Condition',
    svg: 'assets/svgs/logic-condition.svg',
  },
  redirect: {
    label: 'Redirect',
    svg: 'assets/svgs/logic-redirect.svg',
  },
  code: {
    label: 'Code',
    svg: 'assets/svgs/logic-code.svg',
  },
  typebot_link: {
    label: 'Typeot',
    svg: 'assets/svgs/logic-typebot.svg',
  },
  webhook: {
    label: 'Webhooks',
    svg: 'assets/svgs/integeration-webhook.svg',
  },
  email: {
    label: 'Email',
    svg: 'assets/svgs/integeration-email.svg',
  },
};

export class Editor {
  instance: any;
  wrapperElement: any;
  groupBlockIdsMapping: any = {};
  rightClickPopovers: any = {
    connector: [],
    group: [],
    block: [],
    itemField: [],
  };
  savePoppedEle: any = [];

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

  connectorPaintStyle = {
    stroke: '#9CA3AF',
    strokeWidth: 2,
  };

  connectorHoverStyle = {
    stroke: '#1a5fff',
    strokeWidth: 2,
  };

  sourceEndpoint = {
    endpoint: {
      type: 'Dot',
      options: { radius: 6, cssClass: 'endpoint source-endpoint grouper' },
    },
    paintStyle: {
      fill: 'transparent',
      stroke: 'none',
    },
    source: true,
    target: false,
    connectorStyle: this.connectorPaintStyle,
    connectorHoverStyle: this.connectorHoverStyle,
    maxConnections: 4,
    scope: 'jsplumb_defaultscope',
  };

  targetEndpoint = {
    endpoint: {
      type: 'Blank',
      options: { radius: 7, cssClass: 'endpointOnTarget grouper' },
    },
    paintStyle: {
      fill: 'none',
    },
    maxConnections: 2,
    source: false,
    target: true,
    uniqueEndpoint: true,
    deleteEndpointsOnDetach: false,
  };

  groupSourceEndpoint = {
    endpoint: {
      type: 'Dot',
      options: {
        radius: 6,
        cssClass: 'endpoint group-source-endpoint grouper',
      },
    },
    paintStyle: {
      fill: 'transparent',
      stroke: 'none',
    },
    source: false,
    target: false,
    connectorStyle: this.connectorPaintStyle,
    connectorHoverStyle: this.connectorHoverStyle,
    maxConnections: 4,
    scope: 'jsplumb_defaultscope',
  };

  dragOptions = {
    zIndex: 2000,
    containment: ContainmentType.notNegative,
  };

  connectionOverlays = [
    {
      type: 'PlainArrow',
      options: {
        location: 1,
        length: 8,
        width: 8,
        foldback: 0.8,
        id: 'connected_arrow',
        events: {
          click: function () {
            alert('you clicked on the arrow overlay');
          },
        },
      },
    },
  ];

  connectorProp = {
    type: FlowchartConnector.type,
    options: {
      stub: [10, 15],
      alwaysRespectStubs: true,
      cornerRadius: 20,
      midpoint: 0.5,
    },
  };

  constructor(editorService: EditorService) {}

  createInstance(wrapper: ElementRef) {
    this.wrapperElement = wrapper;
    this.instance = newInstance({
      dragOptions: this.dragOptions,
      connectionOverlays: this.connectionOverlays,
      connector: this.connectorProp,
      container: this.wrapperElement.nativeElement,
    });

    this.instance.addTargetSelector('.single-group', {
      ...this.targetEndpoint,
      ...{
        anchor: 'ContinuousLeft',
        scope: 'target_scope',
        redrop: 'any',
      },
    });
  }

  drawEditor(response: any) {
    if (response) {
      response = JSON.parse(response);
      this.groupBlocks = response.groups;
      let edges = response.edges;

      console.log('groupBlocks', this.groupBlocks);

      this.instance.batch(() => {
        this.groupBlocks.forEach((gr) => {
          this.manageNode(gr.id, ['Right'], 'group');

          gr.blocks.forEach((b, i) => {
            if (b.type === 'choice_input' && !b.options.isMultipleChoice) {
              b.items.forEach((item: any) => {
                this.manageNode('item-' + item.id, ['Right'], 'block');
              });
            }

            if (gr.blocks.length - 1 === i) {
              this.manageNode('be-' + b.id, ['Right'], 'block');
            }
            this.groupBlockIdsMapping[b.id] = gr.id;
          });
        });

        setTimeout(() => {
          edges.forEach((edge: any) => {
            let sourceId = edge.from.itemId
              ? 'item-' + edge.from.itemId
              : 'be-' + edge.from.blockId;
            let targetId = edge.to.blockId ? edge.to.blockId : edge.to.groupId;

            this.instance.connect({
              source: document.getElementById(sourceId),
              target: document.getElementById(targetId),
              anchors: ['Right', 'ContinuousLeft'],
              endpoints: [
                this.sourceEndpoint.endpoint,
                this.targetEndpoint.endpoint,
              ],
              endpointStyles: [
                this.sourceEndpoint.paintStyle,
                this.targetEndpoint.paintStyle,
              ],
              // detachable: false,
              // reattach: true,
              deleteEndpointsOnDetach: true,
              scope: 'jsplumb_defaultscope',
              redrop: 'any',
            });
          });
        }, 100);
      });
    }
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
    } else {
      // const element = this.instance.getManagedElement(id);
      for (let i = 0; i < sourceAnchors.length; i++) {
        const sourceUUID = id + sourceAnchors[i];
        this.instance.addEndpoint(document.getElementById(id), sourcePoint, {
          anchor: sourceAnchors[i],
          uuid: sourceUUID,
        });
      }
    }

    if (id === this.firstBlockId) {
      this.instance.toggleDraggable(document.getElementById(id));
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
            this._removeEndPoint('be-' + block.id);
          });
          // Add endpoint to last block
          this.manageNode(
            'be-' + group.blocks[group.blocks.length - 1].id,
            ['Right'],
            'block'
          );
        }
      });
    }
  }

  _removeEndPoint(id: string) {
    // this.instance.manage(document.getElementById(id));
    // const element = this.instance.getManagedElement(id);
    this.instance.removeAllEndpoints(document.getElementById(id));
  }

  deleteConnection(id: string) {
    let con = this.instance.getConnections({ source: id }); // Get all source el. connection(s) except the new connection which is being established
    if (con.length != 0 && document.getElementById(id)) {
      for (var i = 0; i < con.length; i++) {
        this.instance.deleteConnection(con[i]);
      }
    }
  }

  removeSelectedBorder() {
    const selectedElem = document.querySelectorAll('.selected');
    selectedElem.forEach((e) => {
      e.classList.remove('selected');
    });
  }

  bindEvents() {
    this.instance.bind('connection', (info: any, e: any) => {
      let data = {
        type: 'edge',
        source: info.sourceId,
        target: info.targetId,
      };
      this.savePoppedEle.push(data);
      this.instance.setAttribute(
        info.connection.connector.canvas,
        'connector-source-id',
        info.sourceId
      );
      this.instance.setAttribute(
        info.connection.connector.canvas,
        'connector-target-id',
        info.targetId
      );

      this.instance.on(info.connection.connector.canvas, 'click', (e: any) => {
        let connector = e.target.closest('.jtk-connector');
        this.instance.addClass(connector, 'selected');
        this.instance.addClass(
          document.getElementById(
            this.groupBlockIdsMapping[
              connector.getAttribute('connector-source-id').replace('be-', '')
            ]
          ),
          'selected'
        );
        this.instance.addClass(
          document.getElementById(
            connector.getAttribute('connector-target-id')
          ),
          'selected'
        );
      });

      this.instance.on(
        info.connection.connector.canvas,
        'contextmenu',
        (e: any) => {
          e.preventDefault();
          let connector = e.target.closest('.jtk-connector');
          let type = 'connector';
          let id = type + '-' + connector.getAttribute('connector-source-id');

          if (document.getElementById(id)) {
            // if any coonector popover found then delete it first
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
      );
    });

    this.instance.bind(EVENT_DRAG_STOP, (drag: any) => {
      if (drag.el._isJsPlumbGroup) {
        const groupIndex: any = document
          .getElementById(drag.el.id)
          ?.getAttribute('data-group-index');
        this.groupBlocks[groupIndex].position.x = drag.el.offsetLeft;
        this.groupBlocks[groupIndex].position.y = drag.el.offsetTop;
      }
    });

    window.addEventListener('click', (e: any) => {
      if (e.target.nodeName !== 'path') {
        this.removeSelectedBorder();
      }

      this.removeCloneDeletePopup(
        this.wrapperElement.nativeElement.children,
        e
      );
    });

    this.instance.bind('beforeDrop', (ci: any) => {
      // Before new connection is created
      this.deleteConnection(ci.sourceId);
      this.removeSelectedBorder();
      return true; // true for establishing new connection
    });
  }

  removeCloneDeletePopup(elements: any, clickElement: any) {
    let isAllowToRemove = true;
    for (const el of elements) {
      if (!el.classList.contains('recieveDragedBox')) {
        if (el.contains(clickElement.target)) {
          isAllowToRemove = false;
        }
      }
    }

    if (isAllowToRemove) {
      this.resetRightClickPopovers();
      const removePopStyleClass = document.querySelectorAll(
        '.popover-outline-style'
      );
      removePopStyleClass.forEach((e) => {
        e.classList.remove('popover-outline-style');
      });
    }
  }

  resetRightClickPopovers() {
    this.rightClickPopovers = {
      connector: [],
      group: [],
      block: [],
      itemField: [],
    };
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
}
