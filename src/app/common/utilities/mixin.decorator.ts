/**
 * decorator to mixin behaviors
 * example:
 * ```typescript
 *   abstract class Behavior {
 *     method() {}
 *   }
 *
 *   interface Specimen extends Behavior {}
 *
 *   @Mixin(Behavior)
 *   class Specimen {}
 *
 *   //..
 *
 *   const specimen = new Specimen()
 *   specimen.method()
 * ```
 * @param classes classes to mix in to the decorated class
 */
export interface Mixin {
  postConstructor?: Array<Function>
}

export function Mixin(...classes: Function[]): ClassDecorator {
  return function (target) {
    // save a reference to the original constructor
    const original: any = target
    const postConstructors: Array<Function> = []

    // the new constructor behaviour
    function f(...args: any[]) {
      const instance = new original(...args)
      postConstructors.forEach((unboundMethod: Function) => {
        const fn = unboundMethod.bind(instance)
        fn()
      })

      return instance
    }

    // copy prototype so intanceof operator still works
    f.prototype = original.prototype

    classes.forEach(constructor => {
      if (Object.getOwnPropertyNames(constructor).includes('postConstructor')) {
        postConstructors.push(constructor['postConstructor'])
      }
      Object.getOwnPropertyNames(constructor.prototype)
        .filter(x => !['constructor'].includes(x))
        .forEach(name => {
          Object.defineProperty(
            f.prototype,
            name,
            Object.getOwnPropertyDescriptor(constructor.prototype, name),
          )
        })
    })

    // return new constructor (will override original)
    return f
  } as ClassDecorator
}
