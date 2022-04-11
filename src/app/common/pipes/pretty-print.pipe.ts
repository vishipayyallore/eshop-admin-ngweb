import { Pipe, PipeTransform } from '@angular/core';

const getCircularReplacer = () => {
  const seen = new WeakSet();
  return (key: string, value: any) => {
    if (typeof value === 'object' && value !== null) {
      if (seen.has(value)) {
        return;
      }
      seen.add(value);
    }
    return value;
  };
};

@Pipe({
  name: 'prettyprint'
})
export class PrettyPrintPipe implements PipeTransform {
  transform(val: any) {
    if (typeof (val) === 'undefined' || typeof (val) === null) {
      return ''; // check value before process it.
    }
    return JSON.stringify(val, getCircularReplacer(), ' ')
      .replace(' ', '&nbsp;')
      .replace('\n', '<br/>')
      .replace(/\"([^(\")"]+)\":/g, '$1:');
  }
}
