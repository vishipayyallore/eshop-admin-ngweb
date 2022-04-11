import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-entity-create',
  templateUrl: './entity-create.component.html',
  styleUrls: ['./entity-create.component.scss']
})
export class EntityCreateComponent implements OnInit {
  @Input() schema: any = {}
  @Input() entity: any = {}
  @Output('entityChange') entityEmitter = new EventEmitter()
  @Output('create') createEmitter = new EventEmitter()

  constructor() { }

  ngOnInit(): void {
  }

}
