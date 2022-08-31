import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EditorService {
  private block$ = new BehaviorSubject<any>({});
  selectedBlock$ = this.block$.asObservable();

  constructor() { }

  setBlock(block: any) {
    this.block$.next(block);
  }
}
