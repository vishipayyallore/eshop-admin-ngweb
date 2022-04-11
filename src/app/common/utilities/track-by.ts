/*
** Use TrackBy when repeating over elements with NgFor on commonly used properties
**
** Manipulating the DOM can be very expensive and can add up quickly when rendering long lists of items.
** When repeating over a list of complex objects using ngFor, Angular checks for a change in reference to the list.
** Therefore when a subscription updates a list of items Angular will think the whole list has changed even though
** it may be that only one item in the list needs to be updated. Using a trackBy function tells Angular if an individual
** item is different or the same.
**
** <div *ngFor="let item of longListOfItems; trackBy: trackBy.id">
** <div>{{item.name}}</div>
** </div>
**
** If a repeated property is used in more than one component you can just add a method to this class for it.
**
*/

export class TrackBy<T> {
  static readonly protectedProperties = ['key', 'id', 'index', 'customProperty'];
  [key: string]: Function | string;

  private key: string;
  constructor(key = 'id') {
    this.key = key;
    if (!TrackBy.protectedProperties.includes(key)) {
      this[key] = this.customProperty;
    }
  }
  id(index: number, item: any): string {
    return item.id;
  }

  index(index: number): number {
    return index;
  }

  customProperty(index: number, item: T & {[index: string]:any}): string {
    return item[this.key];
  }
}
