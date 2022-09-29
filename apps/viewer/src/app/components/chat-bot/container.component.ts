import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.css'],
})
export class ContainerComponent implements OnInit {
  editor: any;
  edges: any;
  blocks: any = [];
  chatBotblocks: any = [];
  fields = {
    bubbles: ['text', 'image', 'video', 'embed'],
    inputs: [
      'text_input',
      'number_input',
      'email_input',
      'url_input',
      'date_input',
      'phone_number_input',
    ],
  };
  loadingBot: boolean = false;
  botCounter = 0;
  offset: any = 0;

  constructor() {}

  ngOnInit(): void {
    this.editor = localStorage.getItem('editor');

    this.editor = JSON.parse(this.editor);

    if (this.editor) {
      this.buildBlocksStructure();

      this.renderChatBot();
    }
  }

  buildBlocksStructure() {
    this.editor.edges.forEach((edge: any) => {
      this.setBlocksData(edge.to);
    });
  }

  setBlocksData(data: any) {
    this.editor.groups.forEach((group: any) => {
      if (group.id === data.groupId) {
        group.blocks.forEach((block: any) => {
          if (data.blockId === undefined) {
            this.blocks.push(block);
          }

          if (block.id === data.blockId) {
            this.blocks.push(block);
          }
        });
        return;
      }
    });
  }

  renderChatBot() {
    if (this.blocks) {
      this.renderNextStep();
    }
  }

  renderNextStep() {
    if (this.botCounter === this.blocks.length) {
      return;
    }

    this.loadingBot = true;

    setTimeout(() => {
      this.loadingBot = false;
      this.chatBotblocks.push(this.blocks[this.botCounter]);
      this.botCounter++;
      if (
        this.fields.bubbles.indexOf(this.blocks[this.botCounter - 1].type) !==
        -1
      ) {
        this.renderNextStep();
        this.calculateTop(this.blocks[this.botCounter]);
      }
    }, 2000);
  }

  emailVerification(event: any) {
    var mailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (event.detail === 1) {
      if (event.target.previousSibling.value.match(mailFormat)) {
        this.renderNextStep();
      } else {
        this.loadingBot = true;
        const lastEle = this.chatBotblocks.length - 1;
        setTimeout(() => {
          this.loadingBot = false;
          const validationError = {
            type: 'error',
            message: this.chatBotblocks[lastEle].options.retryMessageContent,
          };
          this.chatBotblocks.push(validationError);
          this.chatBotblocks.push(this.chatBotblocks[lastEle]);
        }, 2000);
      }
    } else {
      if (event.target.value.match(mailFormat)) {
        this.renderNextStep();
      } else {
        this.loadingBot = true;
        const lastEle = this.chatBotblocks.length - 1;
        setTimeout(() => {
          this.loadingBot = false;
          const validationError = {
            type: 'error',
            message: this.chatBotblocks[lastEle].options.retryMessageContent,
          };
          this.chatBotblocks.push(validationError);
          this.chatBotblocks.push(this.chatBotblocks[lastEle]);
        }, 2000);
      }
    }
  }

  UrlVerification(event: any) {
    var urlFormat = /(.|\s)*\S(.|\s)*/;
    if (event.detail === 1) {
      if (event.target.previousSibling.value.match(urlFormat)) {
        this.renderNextStep();
      } else {
        this.loadingBot = true;
        const lastEle = this.chatBotblocks.length - 1;
        setTimeout(() => {
          this.loadingBot = false;
          const validationError = {
            type: 'error',
            message: this.chatBotblocks[lastEle].options.retryMessageContent,
          };
          this.chatBotblocks.push(validationError);
          this.chatBotblocks.push(this.chatBotblocks[lastEle]);
        }, 2000);
      }
    } else {
      if (event.target.value.match(urlFormat)) {
        this.renderNextStep();
      } else {
        this.loadingBot = true;
        const lastEle = this.chatBotblocks.length - 1;
        setTimeout(() => {
          this.loadingBot = false;
          const validationError = {
            type: 'error',
            message: this.chatBotblocks[lastEle].options.retryMessageContent,
          };
          this.chatBotblocks.push(validationError);
          this.chatBotblocks.push(this.chatBotblocks[lastEle]);
        }, 2000);
      }
    }
  }

  calculateTop(data: any) {
    this.offset = document.getElementById('flex-col')?.offsetHeight;
    const element = <HTMLSelectElement>document.getElementById('flex-image');
    element.style.top = this.offset + this.offset - 70 + 'px';
  }
}
