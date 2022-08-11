import { GroupStructuredBlock } from "./editor.interfaces";

export class StructuredBlocks {
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
