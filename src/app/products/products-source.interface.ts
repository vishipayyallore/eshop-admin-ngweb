import { Product } from "./product.interface";


export interface ProductsSource {
  products: Array<Product>
  productsPut?: any
  productsPost?: Product
}
