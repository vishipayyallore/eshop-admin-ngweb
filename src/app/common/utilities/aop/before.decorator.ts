import type { Constructor } from '@src/types/constructor'

/**
 * @function Before
 * @description decorator to execute code before method execution
 * @param beforeFunction method to decorate
 * @todo add support for accessors
 */
export function Before(beforeFunction: Function) {
  return function (
    _targetClass: Constructor,
    _propertyKey: string | symbol,
    descriptor: PropertyDescriptor,
  ): PropertyDescriptor {
    const originalMethod = descriptor.value

    descriptor.value = function (...args: any[]) {
      function res() {
        beforeFunction.bind(this)(...args)
        const result = originalMethod.bind(this)(...args)

        return result
      }

      return res.bind(this)()
    }

    return descriptor
  }
}
