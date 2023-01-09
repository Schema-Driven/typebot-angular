import { Component, Input, OnInit, Output, OnChanges } from '@angular/core';
import { EditorService } from '../../../../services/editor.service';

@Component({
  selector: 'app-select-field',
  templateUrl: './select-field.component.html',
  styleUrls: ['./select-field.component.css']
})
export class SelectFieldComponent implements OnInit , OnChanges {

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

    window.onclick = function(event:any){
      if(!event.target?.classList.contains('stripe-modal-content')){
        let ele = document.getElementById('connect_new_modal') as HTMLInputElement;
        ele.classList.replace('block','hidden');
      }
    }

  }

  ngOnChanges(){
  }

  getValue(event:any){
    if(event.target.innerText == '+ Connect New'){
      this.connectNewModal = true;
      event.target.addEventListener('click', function(){
        console.log('connect')
        let el = document.getElementById('connect_new_modal') as HTMLInputElement;
        el.classList.replace('hidden','block');
        document.getElementById('close-stripe-modal')?.addEventListener('click', function(){
          el.classList.replace('block','hidden');
        })
      })
    }else{
      // event.target.parentNode.previousElementSibling.innerText = event.target.innerText
      // this.toggleSelectDiv = false;
      let ele = document.getElementsByClassName("custom-select-dropdown")[0] as HTMLInputElement;
      ele.classList.replace('block','hidden');
    }
  }

  toggleDropDown(event:any){
    // this.toggleSelectDiv = !this.toggleSelectDiv;
    // let ele = document.getElementsByClassName("custom-select-dropdown")[0] as HTMLInputElement;
    let ele = event.target.nextElementSibling;
    if(ele.classList.contains('hidden')){
      ele.classList.replace('hidden','block');
    }else{
      ele.classList.replace('block','hidden');
    }

  }

}
