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
    const state = {value: new ReplaySubject<T>()}
    Object.defineProperties(target.prototype, {
      state,
      state$: {value: state.value.asObservable()}
    })
    return target
  } as ClassDecorator
}

export function emitPropertyChange(property: string) {
  return function (this: StatefulSubject): void {
    this.state.next({ [property]: (this as any)[property] })
  }
}

export function emitPropertyChanges(...properties: Array<string>) {
  return function (this: StatefulSubject): void {
    const state = properties.reduce((dict, property) => {
      dict[property] = (this as any)[property]
      return dict
    }, {} as {[state: string]: unknown})

    this.state.next(state)
  }
}