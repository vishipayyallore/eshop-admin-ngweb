/**
 * comparitor to find defined values
 * @param value expected to be not null or undefined
 */
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function isDefined(value: any): boolean {
  return !(value === null || value === undefined)
}
