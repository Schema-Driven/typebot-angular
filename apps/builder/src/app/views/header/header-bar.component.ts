import {
  Component,
  AfterContentInit,
  Input,
  OnChanges,
  OnInit,
  DoCheck,
} from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { EditorService } from '../../services/editor.service';
import { emojis } from './emoji';

@Component({
  selector: 'header-bar',
  templateUrl: './header-bar.component.html',
  styleUrls: ['./header-bar.component.css'],
})
export class HeaderBarComponent implements AfterContentInit, DoCheck {
  @Input() editorGroupBlocks: any = [];
  @Input() editorGroupBlockEdges: any = [];
  flowAct: boolean = false;
  themeAct: boolean = false;
  settingAct: boolean = false;
  shareAct: boolean = false;
  showComp: boolean = false;
  toggleBotName: boolean = false;
  accessPopup: boolean = false;
  clickEventSubscription: Subscription;
  emojiArray: any = emojis;
  searchedEmoji: any = [];
  changeEmojiView: boolean = true;
  saveTypeBot: boolean = false;
  publishArrowDown: boolean = false;
  unPublishPopup: boolean = false;
  publishText: string = 'Publish';

  constructor(private router: Router, private shared: EditorService) {
    this.clickEventSubscription = this.shared
      .getPreviewClickEvent()
      .subscribe(() => {
        this.onPress();
      });
    window.addEventListener('click', (e) => {
      const target = e.target as HTMLTextAreaElement;
      if (!target.classList.contains('access-popup')) {
        this.accessPopup = false;
        this.unPublishPopup = false;
      }
    });
  }

  ngAfterContentInit(): void {
    if (window.location.pathname === '/editor') {
      this.flowClick();
    } else if (window.location.pathname === '/theme') {
      this.themeClick();
    } else if (window.location.pathname === '/msetting') {
      this.settingClick();
    } else if (window.location.pathname === '/share') {
      this.shareClick();
    }
  }

  ngDoCheck(): void {
    // console.log(
    //   'Groups',
    //   this.editorGroupBlocks,
    //   'edges',
    //   this.editorGroupBlockEdges
    // );
  }

  navigate(links: any[]) {
    this.router.navigate(links);
  }
  flowClick() {
    this.flowAct = true;
    this.themeAct = false;
    this.settingAct = false;
    this.shareAct = false;
  }
  themeClick() {
    this.flowAct = false;
    this.themeAct = true;
    this.settingAct = false;
    this.shareAct = false;
  }
  settingClick() {
    this.flowAct = false;
    this.themeAct = false;
    this.settingAct = true;
    this.shareAct = false;
  }
  shareClick() {
    this.flowAct = false;
    this.themeAct = false;
    this.settingAct = false;
    this.shareAct = true;
  }
  onPress() {
    this.showComp = true;
  }
  receiveChildData(data: any) {
    console.log(data);
    this.showComp = data;
  }

  toggleSpan(e: any) {
    e.target.setAttribute('hidden', 'hidden');
    e.target.nextSibling.classList.remove('hidden');
  }

  toggleInput(e: any) {
    if (e.target.value !== '') {
      e.target.classList.add('hidden');
      e.target.previousSibling.setAttribute('hidden', '');
    }
  }

  setValue(e: any) {
    e.target.previousSibling.innerText = e.target.value;
  }

  toggleEmoji() {
    let a = document.querySelector('.emoji-main') as HTMLInputElement;
    if (a.classList.contains('hidden')) {
      a.classList.remove('hidden');
    } else {
      a.classList.add('hidden');
    }
    window.addEventListener('click', (e) => {
      const target = e.target as HTMLElement;
      if (!target.classList.contains('changeable-icon')) {
        a.classList.add('hidden');
      }
    });
  }

  replaceEmoji(e: any) {
    let changedEmoji = document.querySelector(
      '#changed-emoji'
    ) as HTMLInputElement;
    let defaultEmoji = document.querySelector(
      '#emoji-default'
    ) as HTMLInputElement;
    defaultEmoji?.classList.add('hidden');
    if (changedEmoji?.classList.contains('hidden')) {
      changedEmoji?.classList.remove('hidden');
    }
    changedEmoji.innerHTML = e.target.innerText;
  }

  getEmojiResult(val: any) {
    if (val.target.value !== '') {
      this.changeEmojiView = false;
      this.emojiArray.filter((ele: any) => {
        ele.tags.forEach((tags: any) => {
          if (val.target.value === tags) {
            this.searchedEmoji.push(ele);
          }
        });
      });
    } else {
      this.searchedEmoji = [];
      this.changeEmojiView = true;
    }
  }

  toggleAccessPop() {
    this.accessPopup = !this.accessPopup;
  }

  showHelpModal() {
    this.shared.sendHelpClickEvent();
  }

  undoBtn() {
    this.shared.undoClickEvent();
  }

  redoBtn() {
    this.shared.redoClickEvent();
  }

  async savingTypeBot(e: any) {
    this.saveTypeBot = true;
    await setTimeout(() => {
      this.saveTypeBot = false;
      this.publishText = 'Published';
      document.querySelector('.publish-btn-main')?.setAttribute('disabled', '');
      document
        .querySelector('.publish-btn-main')
        ?.setAttribute('style', 'opacity:0.5;cursor:not-allowed');
      this.publishArrowDown = true;
    }, 2000);
  }

  toggleUnpublish() {
    this.unPublishPopup = !this.unPublishPopup;
  }

  unpublishTypeBot() {
    this.publishText = 'Publish';
    document.querySelector('.publish-btn-main')?.removeAttribute('disabled');
    document
      .querySelector('.publish-btn-main')
      ?.setAttribute('style', 'opacity:1;cursor:pointer');
    this.publishArrowDown = false;
    this.unPublishPopup = false;
  }
}
