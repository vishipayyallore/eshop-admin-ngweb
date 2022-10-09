
export interface Product {
  id: string
  name: string
  category: string
  summary: string
  description: string
  imageFile: `${string}.${'jpg'|'png'|'jpeg'|'gif'}`
  price: number
  createdBy: "No Name"
  createdDateTime: string | Date
  modifiedBy: string
  modifiedDateTime: string | Date
}

export function factoryProduct() {
  return {
    name: null,
    category: null,
    summary: null,
    description: null,
    imageFile: null,
    price: null
  } as any as Product
}