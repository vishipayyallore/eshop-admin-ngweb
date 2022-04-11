/**
 * accessor decorator to conditionally trigger change detection on change (for
 * use with getters that are in the template)
 **/
export function ChangeDetecting({ changeDetectorRefPropertyKey = 'cd' } = {}) {
  if (!(ChangeDetecting as any).sym) {
    (ChangeDetecting as any).sym = Symbol('ChangeDetecting');
  }

  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ): any {
    const prop = descriptor.hasOwnProperty('get') ? 'get' : 'value';
    const originalAccessor = descriptor[prop];

    descriptor[prop] = function (this: any, ...args: any) {
      if (!this.hasOwnProperty(changeDetectorRefPropertyKey)) {
        // tslint:disable-next-line: max-line-length
        console.warn('[ChangeDetecting] change detector ref not set (use config object with property \'changeDetectorRefPropertyKey\' to indicate your changeDetectorRef)'
        );
      }

      const key = ((ChangeDetecting as any).sym as any) as string;
      if (!this.hasOwnProperty(key)) {
        this[key] = null;
      }

      const res = originalAccessor.call(this, ...args);
      if (this[key] !== res && this[changeDetectorRefPropertyKey]) {
        this[key] = res;
        this[changeDetectorRefPropertyKey].detectChanges();
      }

      this[key] = res;
      return res;
    };

    Object.defineProperty(target, propertyKey, descriptor);
    return descriptor;
  };
}
