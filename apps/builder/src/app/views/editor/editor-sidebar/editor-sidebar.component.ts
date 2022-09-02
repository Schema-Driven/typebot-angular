import { Component, OnInit } from '@angular/core';
import { structuredBlocks, prefilledData } from '../editor';

@Component({
  selector: 'app-editor-sidebar',
  templateUrl: './editor-sidebar.component.html',
  styleUrls: ['./editor-sidebar.component.css']
})
export class EditorSidebarComponent implements OnInit {

  sidePanel: boolean = false;
  deg: number = 3;
  structuredBlocks: any;
  prefilledData: any;

  constructor() { }

  ngOnInit(): void {
    this.structuredBlocks = structuredBlocks;
    this.prefilledData = prefilledData;
  }

  sidePanelClick() {
    this.sidePanel = !this.sidePanel;
  }

  noReturnPredicate() {
    return false;
  }

  cdkDragStarted(event: any) {
    event.source._dragRef._initialTransform = `rotate(${this.deg}deg)`;
  }

}
