import type { Constructor } from './constructor'

/**
 * decorator that can replace and reuse a method
 * @param conf DummyableConfig
 */
export function Dummyable(conf: DummyableConfig) {
  // tslint:disable-next-line: only-arrow-functions
  return function (
    _targetClass: Constructor,
    propertyKey: string | symbol,
    descriptor: PropertyDescriptor,
  ): PropertyDescriptor {
    const originalMethod = descriptor.value

    const config = factoryDummyableConfig(conf)

    if (config.override) {
      descriptor.value = function (...args: unknown[]) {
        // tslint:disable-next-line: no-console
        console.info(`%c [Dummyable] at ${String(propertyKey)}`, 'color: goldenrod')

        const res = config.factoryResponse.bind(this)
        res.__proto__.originalMethod = originalMethod.bind(this)
        return res(...args)
      }
    }
    return descriptor
  }
}

/**
 * (internal) function to generate a compliant conf body from a partial one
 * @param conf Partial<DummyableConfig>
 * @returns compliant Dummyable conf parameter
 */
export function factoryDummyableConfig(
  conf: Partial<DummyableConfig>,
): DummyableConfig {
  if (!Object.prototype.hasOwnProperty.call(conf, 'override')) {
    conf.override = true
  }
  if (!Object.prototype.hasOwnProperty.call(conf, 'factoryResponse')) {
    conf.factoryResponse = () => ({})
  }

  return conf as DummyableConfig
}

/**
 * the config interface
 */
export interface DummyableConfig {
  /**
   * conpile-time property to determine execution of dummyable vs the underlying method
   */
  override?: boolean

  /**
   * compile-time function that can replace the underlying method
   */
  // tslint:disable-next-line: ban-types
  factoryResponse: DummyableFactoryResponse
}

export type DummyableFactoryResponse = Function & { originalMethod?: Function }
