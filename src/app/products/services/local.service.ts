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
  
  constructor(private endpointService: EndpointService) { 
    super()
  }

  @After(emitPropertyChange(Endpoints.Products))
  private setProducts(products: Array<Product>) {
    this.products = products
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
    throw new Error('Method not implemented.');
  }
  createProduct(product: Product | undefined) {
    throw new Error('Method not implemented.');
  }
}
