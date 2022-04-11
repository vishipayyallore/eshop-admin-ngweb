import { 
  ChangeDetectorRef, Component, EventEmitter, 
  Input, OnChanges, Output, SimpleChanges 
} from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { format, parseISO } from 'date-fns';

import { After } from '~common/utilities/aop/after.decorator';
import { Mixin } from '~common/utilities/mixin.decorator';
import { TrackBy } from '~common/utilities/track-by';
import { TargetEvent } from '~common/utilities/target-event';
import { DateTypes, DATE_FORMATS } from './dates-to-format.interface';
import { CrudModes } from './crud-modes';
import { CreateBehavior } from './behaviors/create.behavior';
import { DeleteBehavior } from './behaviors/delete.behavior';
import { UpdateBehavior } from './behaviors/update.behavior'


@Component({
  selector: 'app-entity-crud',
  templateUrl: './entity-crud.component.html',
  styleUrls: ['./entity-crud.component.scss']
})
@Mixin(CreateBehavior, DeleteBehavior, UpdateBehavior)

export class EntityCrudComponent extends TrackBy<number> implements OnChanges {
  @Input() schema: any

  @Input() mode = CrudModes.unknown

  @Input() entity: any
  @Output() changeEntity = new EventEmitter<any>()

  @Output('create') createEmitter = new EventEmitter()
  @Output('update') updateEmitter = new EventEmitter()
  @Output('delete') deleteEmitter = new EventEmitter()

  rows: any[] = []
  rowData: Array<any> = []

  cta = new Subject<null>()
  cta$: Observable<null>

  isCreateMode = false
  isReadMode = true
  isUpdateMode = false
  isDeleteMode = false

  constructor(private cd: ChangeDetectorRef) {
    super()
    this.cta$ = this.cta.asObservable()
  }

  @After(function(this: EntityCrudComponent, changes: SimpleChanges){
    if(
      (changes.hasOwnProperty('entity') || changes.hasOwnProperty('schema'))
      && this.entity 
      && this.schema
    ){
      this.rows = Object.entries(this.entity ?? {})
        .map(this.entityEntriesToRows.bind(this))
      this.cd.markForCheck()
    }
  })

  ngOnChanges(changes: SimpleChanges): void {
    if(changes.hasOwnProperty('mode')){
      const value = changes['mode'].currentValue
      this.isCreateMode = value === CrudModes.Create
      this.isReadMode = value === CrudModes.Read
      this.isUpdateMode = value === CrudModes.Update
      this.isDeleteMode = value === CrudModes.Delete  
    }
  }

  private entityEntriesToRows([key, value]: [string, any]): any {
    if(this.schema.hasOwnProperty(key) 
      && ['date', 'time', 'datetime-local'].includes(this.schema[key].type)){
      return { 
        ...this.schema[key],
        key, 
        value: format( 
          typeof value === 'string' ? parseISO(value): value, 
          DATE_FORMATS[this.schema[key].type as DateTypes]
        ),
        outputValue: value 
      }
    }
    return { ...this.schema[key], key, value }
  }

  onDateChange(event: Event, row: any) {
    const e = event as TargetEvent<string>;
    row.value = e.target.value
    row.outputValue = format(new Date(e.target.value!), row.format)
  }

  onCTA() {
    this.cta.next(null)
  }

  composeEntity() {
    const entity = Object.fromEntries(
      this.rows.map(x => ([x.key, x.outputValue ?? x.value])))
    this.changeEntity.emit(entity)
  }
}
