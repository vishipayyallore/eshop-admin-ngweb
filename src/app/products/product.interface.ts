
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