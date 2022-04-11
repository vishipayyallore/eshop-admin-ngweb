/**
 * @function is
 * @description factory pattern for creating custom "is"-type comparators
 * @param o pattern (variable) to compare to
 * @returns a comparator that returns true if the input object is equal to the pattern
 */
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function is(o: unknown): (x: unknown) => boolean {
  return x => x === o
}
