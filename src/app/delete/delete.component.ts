import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.css']
})
export class DeleteComponent implements OnInit {

  //initialise a variable to store data get from parent

  @Input() data:String | undefined
  @Output() onCancel=new EventEmitter()
  @Output() onProceed = new EventEmitter()

  constructor(){ }

  ngOnInit(): void{

  }

  yes() {
    this.onProceed.emit()
  }
  cancel(){
    this.onCancel.emit()
  }

}
