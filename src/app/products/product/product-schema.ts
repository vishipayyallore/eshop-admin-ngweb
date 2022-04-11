export const productSchema = {
  id: { type: 'text', length: 24 },
  name: { type: 'text', length: 24 },
  category: { type: 'list', datalist: [] },
  summary: { type: 'textarea', length: 80 },
  description: { type: 'textarea', length: 1024 },
  imageFile: { type: 'text', length: 24 },
  price: { type: 'number', min:0.0001 },
  createdBy: { type: 'text', length: 24 },
  createdDateTime:  { type: 'datetime-local', format: 'yyyy-MM-ddTHH:mm' },
  modifiedBy: { type: 'text', length: 24 },
  modifiedDateTime: { type: 'datetime-local', format: 'yyyy-MM-ddTHH:mm' },
}