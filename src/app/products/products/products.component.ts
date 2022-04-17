import { ChangeDetectorRef, Component, OnInit } from '@angular/core';

import { ChangeDetecting } from '~common/utilities/change-detecting.decorator';
import { LocalService } from '~/app/products/services/local.service';
import { Product } from '~/app/products/product.interface';
import { ProductsSource } from '~/app/products/products-source.interface';
import { environment } from '~/environments/environment';
import config from '~/config';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  @ChangeDetecting() products: Array<Product>=[]
  environment = environment;
  cdnHost = config['cdnHost'];

  constructor(
    private cd: ChangeDetectorRef,
    private localService: LocalService
  ) {}

  ngOnInit(): void {
    this.localService.getProducts()
    this.localService.state$.subscribe(this.onProductChange.bind(this))
  }

  private onProductChange(state: ProductsSource) {
    if(state.hasOwnProperty('products')){
      this.products = state.products
    }
  }
}
