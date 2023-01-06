import { Component, Input, OnInit } from '@angular/core';
import { EditorService } from '../../../../services/editor.service';

@Component({
  selector: 'app-select-field',
  templateUrl: './select-field.component.html',
  styleUrls: ['./select-field.component.css']
})
export class SelectFieldComponent implements OnInit {

  @Input() data: any = {};
  block: any = {};
  isShow: boolean = true;
  toggleSelectDiv : boolean = false;
  connectNewModal: boolean = false;

  constructor(private editorService: EditorService) { }

  ngOnInit() {
    this.editorService.selectedBlock$.subscribe((block: any) => {
      this.block = block;
    });

    if (this.data.dependent) {
      this.isShow = false;
    }

  }

  getValue(event:any){
    if(event.target.innerText == '+ Connect New'){
      this.connectNewModal = true;
    }else{
      event.target.parentNode.previousElementSibling.innerText = event.target.innerText
    }
  }

  toggleDropDown(){
    this.toggleSelectDiv = !this.toggleSelectDiv;
  }

}
