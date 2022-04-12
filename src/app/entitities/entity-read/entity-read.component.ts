import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-entity-read',
  templateUrl: './entity-read.component.html',
  styleUrls: ['./entity-read.component.scss']
})
export class EntityReadComponent implements OnInit {
  @Input() schema: any
  @Input() entity: any

  rows: any[] = []
  rowData: Array<any> = []

  constructor() { }

  ngOnInit(): void {
    this.rows = Object.entries(this.entity ?? {})
      .map(([key, value]) => ({...this.schema[key], key, value}))
  }
}
