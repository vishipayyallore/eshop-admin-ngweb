import { EventEmitter } from "@angular/core";
import { Observable, Subject } from "rxjs";

import { CrudModes } from "../crud-modes";


export abstract class CreateBehavior {
  mode: CrudModes = CrudModes.unknown
  createEmitter!:EventEmitter<any>

  cta = new Subject<null>()
  cta$ = new Observable<null>();

  static postConstructor(this: CreateBehavior) {
    this.cta$.subscribe(this.onCreateBehaviorCTA.bind(this))
  }

  abstract composeEntity():void

  onCreateBehaviorCTA() {
    if(this.mode === CrudModes.Create){
      this.composeEntity()
      this.createEmitter.emit()
    }
  }
}