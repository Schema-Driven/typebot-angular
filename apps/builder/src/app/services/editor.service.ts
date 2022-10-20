import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EditorService {
  private editorJson$ = new BehaviorSubject<any>({});
  private groupBlocks$ = new BehaviorSubject<any>({});
  private block$ = new BehaviorSubject<any>({});
  private subject = new Subject<any>();

  selectedBlock$ = this.block$.asObservable();
  selectedGroupBlocks$ = this.block$.asObservable();
  selectedEditorJson$ = this.editorJson$.asObservable();

  constructor() {}

  setGroupBlocks(groups: any) {
    this.groupBlocks$.next(groups);
  }

  setBlock(block: any) {
    this.block$.next(block);
  }

  setEditorJson(editor: any) {
    this.editorJson$.next(editor);
  }

  sendClickEvent() {
    this.subject.next(eval);
  }
  getClickEvent(): Observable<any> {
    return this.subject.asObservable();
  }
}
