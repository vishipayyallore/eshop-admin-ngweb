import type { Constructor } from './constructor'

/**
 * decorator execute code _after_ method completes
 * @param afterFunction method to decorate
 * TODO - add support for accessors
 */
export function After(afterFunction: Function) {
  return function (
    _targetClass: Constructor,
    _propertyKey: string | symbol,
    descriptor: PropertyDescriptor,
  ): PropertyDescriptor {
    const originalMethod = descriptor.value

    descriptor.value = function (...args: any[]) {
      function res(this: any) {
        const result = originalMethod.bind(this)(...args)
        afterFunction.bind(this)(...args)

        return result
      }

      return res.bind(this)()
    }

    return descriptor
  }
}