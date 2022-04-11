import { isDefined } from './is-defined'

/**
 * generate a comparator that looks for existance of a value at a property
 * example:
 * ```typescript
 * const cases = [ {a:2}, {a:3}, {a:4} ]
 * const isOdd = factoryHasValue('a', () => a%2)
 * assert(cases.some(isOdd))
 * ```
 * @param property that is required on the comparator
 * @param evaluator that is called in the comparator, on the property, to determine the matching of the value
 * @returns comparator
 */
export function factoryHasValue(property: string, evaluator: Function = isDefined) {
  return function (value: { [prop: string]: any }): boolean {
    return value?.[property] ? evaluator(value?.[property]) : false
  }
}
