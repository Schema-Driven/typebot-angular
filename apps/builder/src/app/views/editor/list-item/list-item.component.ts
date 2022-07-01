import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
  copyArrayItem,
  CdkDragEnter,
  CdkDragExit,
} from '@angular/cdk/drag-drop';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Item } from '../item';

@Component({
  selector: 'list-item',
  templateUrl: './list-item.html',
  styleUrls: ['./list-item.scss'],
})
export class ListItemComponent {
  @Input() item?: Item;
  @Input() parentItem?: Item;
  @Input() public set connectedDropListsIds(ids: string[]) {
    this.allDropListsIds = ids;
  }

  public get connectedDropListsIds(): string[] {
    return this.allDropListsIds.filter((id) => id !== this.item?.uId);
  }

  public allDropListsIds: string[];

  public get dragDisabled(): boolean {
    return !this.parentItem;
  }
  public get parentItm(): string {
    return this.dragDisabled ? '' : this.parentItem ? this.parentItem.uId : '';
  }

  public get parentItemId(): string {
    return this.dragDisabled ? '' : this.parentItem ? this.parentItem.uId : '';
  }

  @Output() itemDrop: EventEmitter<CdkDragDrop<Item>>;

  constructor() {
    this.allDropListsIds = [];
    this.itemDrop = new EventEmitter();
  }

  public onDragDrop(event: any): void {
    this.itemDrop.emit(event);
  }
}
