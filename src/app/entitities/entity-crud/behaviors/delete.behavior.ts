import { EventEmitter } from "@angular/core";
import { Observable, Subject } from "rxjs";

import { CrudModes } from "../crud-modes";


export abstract class DeleteBehavior {
  mode: CrudModes = CrudModes.unknown
  deleteEmitter!:EventEmitter<any>

  cta = new Subject<null>()
  cta$ = new Observable<null>();

  static postConstructor(this: DeleteBehavior) {
    this.cta$.subscribe(this.onDeleteBehaviorCTA.bind(this))
  }

  abstract composeEntity():void

  onDeleteBehaviorCTA() {
    if(this.mode === CrudModes.Delete){
      this.composeEntity()
      this.deleteEmitter.emit()
    }
  }
}