import { EventEmitter } from "@angular/core";
import { Observable, Subject } from "rxjs";

import { CrudModes } from "../crud-modes";


export abstract class UpdateBehavior {
  mode: CrudModes = CrudModes.unknown
  updateEmitter!:EventEmitter<any>

  cta = new Subject<null>()
  cta$ = new Observable<null>()

  static postConstructor(this: UpdateBehavior) {
    this.cta$.subscribe(this.onUpdateBehaviorCTA.bind(this))
  }
  
  abstract composeEntity():void
  
  onUpdateBehaviorCTA() {
    if(this.mode === CrudModes.Update) {
      this.composeEntity()
      this.updateEmitter.emit()
    }
  }
}