import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EditorService {
  private editorJson$ = new BehaviorSubject<any>({});
  private groupBlocks$ = new BehaviorSubject<any>({});
  private block$ = new BehaviorSubject<any>({});
  private previewClick = new Subject<any>();
  private helpClick = new Subject<any>();

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

  sendPreviewClickEvent() {
    this.previewClick.next(eval);
  }

  sendHelpClickEvent() {
    this.helpClick.next(eval);
  }

  getPreviewClickEvent(): Observable<any> {
    return this.previewClick.asObservable();
  }

  getHelpClickEvent(): Observable<any> {
    return this.helpClick.asObservable();
  }
}
