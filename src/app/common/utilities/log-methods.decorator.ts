/**
 * the config interface
 */
export interface LogMethodsConfig {
  /**
   * compile-time boolean condition for whether to apply log aop
   */
  when: boolean
  /**
   * log-level to use (such as {consile.log, console.debug}, etc). defaults to {debug}
   */
  level?: 'debug' | 'info' | 'log' | 'warn' | 'error'
}

/**
 * decorator to log method calls and the paramters passed
 * @param config logging configuration
 */
export function LogMethods(config: LogMethodsConfig = { when: true }) {
  return function (target: InstanceType<any>): InstanceType<any> {
    const level = config.level ?? 'debug'
    if (config.when) {
      for (const propertyName of Object.getOwnPropertyNames(target.prototype)) {
        if (
          // ensure the property is not a computed value
          (Object.getOwnPropertyDescriptor(target.prototype, propertyName) &&
            Object.getOwnPropertyDescriptor(target.prototype, propertyName)!.get) ||
          !(target.prototype[propertyName] instanceof Function)
        ) {
          continue
        }

        const descriptor = getMethodDescriptor(propertyName)
        const originalMethod = descriptor.value
        descriptor.value = function (...args: any[]) {
          // eslint:disable-next-line: no-console
          console[level](
            `%c[${target.name}::${propertyName}]`,
            'color: goldenrod',
            ...args,
          )
          return originalMethod.apply(this, args)
        }

        Object.defineProperty(target.prototype, propertyName, descriptor)
      }
    }
    return target

    function getMethodDescriptor(
      propertyName: string,
    ): TypedPropertyDescriptor<any> {
      if (Object.prototype.hasOwnProperty.call(target, propertyName)) {
        return Object.getOwnPropertyDescriptor(target.prototype, propertyName)!
      }

      // create a new property descriptor for the base class' method
      return {
        configurable: true,
        enumerable: true,
        writable: true,
        value: target.prototype[propertyName],
      }
    }
  }
}
