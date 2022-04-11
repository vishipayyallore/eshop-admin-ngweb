import { Observable, ReplaySubject } from 'rxjs'

import type { StrictConstructor } from './constructor'


/**
 * @decorator Stateful
 * @description a decorator to facilitate state event firing on updates
 * Note: This is meant to be used with the @After decorator and the
 * emitPropertyChange helper function. See the spec file for an example of use
 */

interface State {
  [property: string]: any
}

interface StatefulObservable {
  state$: Observable<State>
}

interface StatefulSubject {
  state: ReplaySubject<State>
}

export interface Stateful<T> {
  state$: Observable<T>
}

export function Stateful<T>(): ClassDecorator {
  // because of the generic, we must use the parameterized form of the decorator
  return function <TFunction extends StrictConstructor>(target: TFunction) {
    const k = class extends target implements StatefulObservable {
      private state: ReplaySubject<T>
      public state$: Observable<T>

      constructor(...args: any[]) {
        super(...args)
        this.state = new ReplaySubject<T>()
        this.state$ = this.state.asObservable()
      }
    }
    Object.defineProperty(k, 'name', {value: target.name})
    return k
  } as ClassDecorator
}

export function emitPropertyChange(property: string) {
  return function (this: StatefulSubject): void {
    this.state.next({ [property]: (this as any)[property] })
  }
}
