import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-editor-fields-data',
  templateUrl: './editor-fields-data.component.html',
  styleUrls: ['./editor-fields-data.component.css'],
})
export class EditorFieldsDataComponent implements OnInit {
  private _jsonURL = '../../../assets/editor.json';
  editorJson: any;
  loader: boolean = false;

  constructor(private http: HttpClient) {
    this.getJSON().subscribe((data) => {
      this.editorJson = data;
      console.log(this.editorJson);
    });
  }

  ngOnInit(): void {}

  public getJSON(): Observable<any> {
    return this.http.get(this._jsonURL);
  }
}
