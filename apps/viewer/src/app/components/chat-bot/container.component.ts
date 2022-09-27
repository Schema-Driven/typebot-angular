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
  emailError: boolean = false;

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
    console.log('after email');
    if (this.chatBotblocks.length === this.blocks.length) {
      return;
    }

    this.loadingBot = true;

    setTimeout(() => {
      this.loadingBot = false;
      this.chatBotblocks.push(this.blocks[this.chatBotblocks.length]);

      if (
        this.fields.bubbles.indexOf(
          this.blocks[this.chatBotblocks.length - 1].type
        ) !== -1
      ) {
        this.renderNextStep();
      }
    }, 2000);
  }

  emailVerificationBtn(event: any) {
    var mailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (event.target.previousSibling.value.match(mailFormat)) {
      this.renderNextStep();
    } else {
      this.emailError = true;
      this.renderNextStep();
    }
  }

  emailVerificationEnter(event: any) {
    var mailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (event.target.value.match(mailFormat)) {
      this.renderNextStep();
    } else {
      this.emailError = true;
      this.renderNextStep();
    }
  }
}
