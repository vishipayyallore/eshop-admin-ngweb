import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-entity-delete',
  templateUrl: './entity-delete.component.html',
  styleUrls: ['./entity-delete.component.scss']
})
export class EntityDeleteComponent implements OnInit {
  @Input() schema: any = {}
  @Input() entity: any = {}
  @Output('delete') deleteEmitter = new EventEmitter()

  constructor() { }

  ngOnInit(): void {
  }

}
