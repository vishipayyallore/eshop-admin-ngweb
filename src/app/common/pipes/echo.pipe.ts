import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'echo'
})
export class EchoPipe implements PipeTransform {
  /* istanbul ignore next */
  transform(value: any, args?: any): any {
    console.log('[EchoPipe]', value);
    return value;
  }
}
