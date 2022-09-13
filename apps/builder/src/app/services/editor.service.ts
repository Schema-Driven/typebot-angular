import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EditorService {

  private groupBlocks$ = new BehaviorSubject<any>({});
  private block$ = new BehaviorSubject<any>({});

  selectedBlock$ = this.block$.asObservable();
  selectedGroupBlocks$ = this.block$.asObservable();

  constructor() { }

  setGroupBlocks(groups: any) {
    this.groupBlocks$.next(groups);
  }

  setBlock(block: any) {
    this.block$.next(block);
  }
}
