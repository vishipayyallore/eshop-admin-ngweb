/**
 * Constructor - a Class
 */
export type Constructor = Partial<new (...args: any[]) => any>
export type StrictConstructor = {
  new (...args: any[]): any
}

export interface Constructable {
  constuctor: Function
}
