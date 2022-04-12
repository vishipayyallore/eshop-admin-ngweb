import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Endpoints } from '~/config/environments/endpoints';
import { LogMethods } from '~common/utilities/log-methods.decorator';
import { factoryHasValue } from '~common/utilities/factory-has-value';
import { is } from '~common/utilities/is';
import { ChangeDetecting } from '~common/utilities/change-detecting.decorator';
import { Product } from '~/app/products/product.interface';
import { LocalService } from '~/app/products/services/local.service';
import { CrudModes } from '~/app/entitities/entity-crud/crud-modes';
import { ProductsSource } from '../products-source.interface';
import { productSchema } from './product-schema';

declare const structuredClone: Function;

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
@LogMethods()
export class ProductComponent implements OnInit {
  @ChangeDetecting() product?: Product
  productId: string | null = null
  productSchema = structuredClone(productSchema)

  isLoading = true
  isCreateMode = false
  isReadMode = true
  isUpdateMode = false
  isDeleteMode = false

  private _mode: CrudModes = CrudModes.Read
  get mode(): CrudModes {
    return this._mode
  }
  set mode(value: CrudModes) {
    this._mode = value
    this.isCreateMode = value === CrudModes.Create
    this.isReadMode = value === CrudModes.Read
    this.isUpdateMode = value === CrudModes.Update
    this.isDeleteMode = value === CrudModes.Delete
  }

  constructor(
    private route: ActivatedRoute,
    private cd: ChangeDetectorRef,
    private localService: LocalService,
  ) { }

  ngOnInit(): void {
    this.productId = this.route.snapshot.paramMap.get('productId')
    this.localService.state$.subscribe(this.onStateChange.bind(this))
  }

  private onStateChange(state: any) {
    if (state.hasOwnProperty(Endpoints.Products)) {
      this.onProductsChange(state);
    }
    if (state.hasOwnProperty(Endpoints.ProductsPut)) {
      this.onProductsUpdateComplete(state);
    }
    if (state.hasOwnProperty(Endpoints.ProductsPost)) {
      this.onProductsCreateComplete(state);
    }
    if (state.hasOwnProperty('deleteProductComplete')) {
      this.onProductsDeleteComplete(state);
    }
  }

  private onProductsChange(state: ProductsSource) {
    this.product = {
      ...this.localService.products
        ?.find(factoryHasValue('id', is(this.productId)))!
    }
    this.productSchema.category.datalist =
      Array.from(new Set(this.localService.products?.map(x => x.category)))
    this.isLoading = false
    return state.products
  }

  private onProductsUpdateComplete(state: ProductsSource) {
    const productIndex = this.localService.products
      ?.findIndex(factoryHasValue('id', is(this.product?.id)))!
    if ((state[Endpoints.ProductsPut]?.status ?? 500) < 300) {
      if (productIndex > -1 && this.product && this.localService.products) {
        this.localService.products[productIndex] = this.product
        this.mode = CrudModes.Read
      }
    } else if (productIndex > -1 && this.localService.products) {
      this.product = this.localService.products[productIndex]
      // TODO: toast 
    }
    this.isLoading = false
  }

  private onProductsCreateComplete(state: ProductsSource) {
    console.log('onProductsCreateComplete state', state)
    this.product = state.productsPost
    this.mode = CrudModes.Read
    this.isLoading = false
  }

  private onProductsDeleteComplete(state: ProductsSource) {
    console.log('onProductsDeleteComplete state', state)
    this.product = undefined
    this.mode = CrudModes.Read
    this.isLoading = false
  }

  onChange(product: any) {
    this.product = product
  }

  onCreate() {
    this.localService.createProduct(this.product)
  }

  onUpdate() {
    this.isLoading = true
    this.localService.updateProduct(this.product)
  }

  onDelete() {
    if (this.product?.id) {
      this.localService.deleteProduct(this.product.id)
    }
  }
}
