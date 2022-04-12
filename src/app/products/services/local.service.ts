import { Injectable } from '@angular/core';
import { first } from 'rxjs';

import { After } from '~common/utilities/aop/after.decorator';
import { 
  emitPropertyChange, Stateful 
} from '~common/utilities/stateful.decorator';
import { EndpointService } from '~common/services/endpoint/endpoint.service';
import { Product } from '../product.interface';
import { ProductsSource } from '../products-source.interface';
import { ProductServicesModule } from './product-services.module';
import { Endpoints } from '~/config/environments/endpoints';

@Stateful<ProductsSource>()
class LSBase {}

export interface LocalService extends Stateful<ProductsSource> {}

@Injectable({
  providedIn: ProductServicesModule
})
export class LocalService extends LSBase {
  products?: Array<Product>
  productsPut?: any
  productsPost?: Product
  
  constructor(private endpointService: EndpointService) { 
    super()
  }

  @After(emitPropertyChange(Endpoints.Products))
  private setProducts(products: Array<Product>) {
    this.products = products
  }

  @After(emitPropertyChange(Endpoints.ProductsPut))
  private setUpdateProductComplete(response: any) {
    this.productsPut = response
  }

  @After(emitPropertyChange(Endpoints.ProductsPost))
  private setCreateProductComplete(product: Product) {
    this.productsPost = product
  }

  getProducts() {
    this.endpointService
      .getEndpoint<Array<Product>>({ endpoint: String(Endpoints.Products) })
      .pipe(first())
      .subscribe(this.setProducts.bind(this))
  }

  deleteProduct(id: string) {
    throw new Error('Method not implemented.');
  }

  updateProduct(product: Product | undefined) {
    this.endpointService.clearEndpointValue(String(Endpoints.ProductsPut))
    this.endpointService.putEndpoint({ 
      endpoint: String(Endpoints.ProductsPut), 
      body: JSON.parse(JSON.stringify(product)) 
    })
    .pipe(first())
    .subscribe(this.setUpdateProductComplete.bind(this))
  }

  createProduct(product: Product | undefined) {
    this.endpointService.clearEndpointValue(String(Endpoints.ProductsPut))
    this.endpointService.postEndpoint({ 
      endpoint: String(Endpoints.ProductsPost), 
      body: JSON.parse(JSON.stringify(product)) 
    })
    .pipe(first())
    .subscribe(this.setCreateProductComplete.bind(this))
  }
}
