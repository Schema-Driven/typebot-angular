import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'chat-bot-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.css'],
})
export class ContainerComponent implements OnInit {
  preview = true;
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
  iframeCheck: boolean = true;

  constructor(private route: ActivatedRoute) {
    this.route.queryParams.subscribe((params) => {
      this.preview = params['preview'] != 'true' ? true : false;
    });
  }

  onFileSelected(event: any) {
    var reader = new FileReader();
    reader.onload = function (e: any) {
      var obj = JSON.parse(e.target.result);
      localStorage.setItem('editor', JSON.stringify(obj));
      window.location.reload();
    };
    reader.readAsText(event.target.files[0]);
  }

  ngOnInit(): void {
    this.editor = localStorage.getItem('editor');

    this.editor = JSON.parse(this.editor);

    if (this.editor) {
      this.buildBlocksStructure();

      this.renderChatBot();
    }
  }

  // buildBlocksStructure() {
  //   this.editor.edges.forEach((edge: any) => {
  //     this.setBlocksData(edge.to);
  //   });
  // }

  buildBlocksStructure() {
    this.editor.groups.forEach((group: any) => {
      if (group.name === 'Start') {
        this.setBlocksData(group.id);
      }
    });
  }

  setBlocksData(Id: any) {
    this.editor.edges.forEach((edge: any) => {
      if (Id === edge.from.groupId && edge.to.blockId !== undefined) {
        this.editor.groups.forEach((group: any) => {
          group.blocks.forEach((block: any) => {
            if (block.id === edge.to.blockId) {
              this.blocks.push(block);
              // this.renderNextStep();
            }
          });
        });
        this.setBlocksData(edge.to.groupId);
      } else if (
        Id === edge.from.groupId &&
        edge.to.blockId !== undefined &&
        edge.to.groupId !== undefined
      ) {
        this.editor.groups.forEach((group: any) => {
          group.blocks.forEach((block: any) => {
            if (block.id === edge.to.blockId) {
              this.blocks.push(block);
              // this.renderNextStep();
            }
          });
        });
        console.log(edge.to.groupId);
        this.setBlocksData(edge.to.groupId);
      } else if (
        Id === edge.from.groupId &&
        edge.to.groupId !== undefined &&
        edge.to.blockId === undefined
      ) {
        this.editor.groups.forEach((group: any) => {
          if (group.id === edge.to.groupId) {
            group.blocks.forEach((block: any) => {
              this.blocks.push(block);
              // this.renderNextStep();
            });
          }
        });
        this.setBlocksData(edge.to.groupId);
      }
    });
  }

  // setBlocksData(data: any) {
  //   this.editor.groups.forEach((group: any) => {
  //     if (group.id === data.groupId) {
  //       group.blocks.forEach((block: any) => {
  //         if (block.type === 'embed') {
  //           let testing = block.content.url;
  //           testing = testing.toString();
  //           if (testing.startsWith('<iframe')) {
  //             this.iframeCheck = true;
  //           } else {
  //             this.iframeCheck = false;
  //           }
  //         }

  //         if (data.blockId === undefined) {
  //           this.blocks.push(block);
  //         }

  //         if (block.id === data.blockId) {
  //           this.blocks.push(block);
  //         }
  //       });
  //       return;
  //     }
  //   });
  // }

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
        this.calculateTop();
      }
    }, 2000);
  }

  emailVerification(val: any) {
    console.log(val);
    var mailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    if (val.match(mailFormat)) {
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
        this.calculateTop();
        this.chatBotblocks.push(this.chatBotblocks[lastEle]);
      }, 2000);
    }
  }

  UrlVerification(val: any) {
    var urlFormat =
      /(https?:\/\/)?(www\.)?[a-z0-9-]+\.(com|org)(\.[a-z]{2,3})?/;

    if (val.match(urlFormat)) {
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
        this.calculateTop();
        this.chatBotblocks.push(this.chatBotblocks[lastEle]);
      }, 2000);
    }
  }

  PhoneNumVerification(val: any) {
    var numFormat = /^[+]*[(]{0,1}[0-9]{1,3}[)]{0,1}[-\s\./0-9]*$/g;

    if (val.match(numFormat)) {
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
        this.calculateTop();
        this.chatBotblocks.push(this.chatBotblocks[lastEle]);
      }, 2000);
    }
  }

  calculateTop() {
    this.offset = document.getElementById('flex-col')?.offsetHeight;
    const element = <HTMLSelectElement>document.getElementById('flex-image');
    element.style.top = this.offset - 35 + 'px';
  }
}
