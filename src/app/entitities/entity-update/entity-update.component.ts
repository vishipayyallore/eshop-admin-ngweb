import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-entity-update',
  templateUrl: './entity-update.component.html',
  styleUrls: ['./entity-update.component.scss']
})
export class EntityUpdateComponent implements OnInit {
  @Input() schema: any = {}
  @Input() entity: any = {}
  @Output('entityChange') entityEmitter = new EventEmitter()
  @Output('update') updateEmitter = new EventEmitter()
  
  rows: any[] = []
  rowData: Array<any> = []

  constructor() { }

  ngOnInit(): void {
    this.rows = Object.entries(this.entity ?? {})
      .map(([key, value]) => ({...this.schema[key], key, value}))
  }
  
}
