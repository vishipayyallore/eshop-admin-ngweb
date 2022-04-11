/**
 * generate a comparator that looks for existance of a property
 * example:
 * ```typescript
 * const cases = [ {a:2}, {a:3, 'dummy-data': true}, {a:4} ]
 * const hasDummyData = factoryHasProperty('dummy-data')
 * assert(cases.some(hasDummyData))
 * ```
 * @param property that is required on the comparator
 * @returns comparator
 */
export function factoryHasProperty(property: string) {
  return function (value: { [prop: string]: any }): boolean {
    // eslint-disable-next-line no-prototype-builtins
    return value?.hasOwnProperty?.(property)
  }
}
