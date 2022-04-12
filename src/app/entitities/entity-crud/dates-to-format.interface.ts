export type DateTypes = 'date' | 'time' | 'datetime-local'

export interface DateToFormat {
  value: string|number, 
  format: string,
  type: DateTypes
}

export const DATE_FORMATS = {
  date: 'yyyy-MM-dd',
  time: 'hh:mm',
  'datetime-local': "yyyy-MM-dd'T'hh:mm",
}
