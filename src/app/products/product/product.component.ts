import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Event, NavigationEnd, Router } from '@angular/router';
import { filter, Subscription } from 'rxjs';

import { Endpoints } from '~/config/environments/endpoints';
import { LogMethods } from '~common/utilities/log-methods.decorator';
import { factoryHasValue } from '~common/utilities/factory-has-value';
import { is } from '~common/utilities/is';
import { ChangeDetecting } from '~common/utilities/change-detecting.decorator';
import { factoryProduct, Product } from '~/app/products/product.interface';
import { LocalService } from '~/app/products/services/local.service';
import { CrudModes } from '~/app/entitities/entity-crud/crud-modes';
import { ProductsSource } from '../products-source.interface';
import { productSchema } from './product-schema';
import config from '~/config';
import { Environments } from '~/config/environments.enum';
import { After } from '~/app/common/utilities/after.decorator';


declare const structuredClone: Function;

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
@LogMethods({ when: config.env === Environments.Development })
export class ProductComponent implements OnInit, OnDestroy {
  private subscriptions = new Subscription()

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
    private router: Router,
    private route: ActivatedRoute,
    private cd: ChangeDetectorRef,
    private localService: LocalService,
  ) { }

  ngOnInit(): void {
    this.subscriptions.add(this.router.events
      .pipe(
        filter(this.isNewProductByRoute.bind(this)),
      )
      .subscribe(this.setProductId.bind(this))
      )
    this.subscriptions.add(this.localService.state$
      .subscribe(this.onStateChange.bind(this)))
    this.setProductId()
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe()
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

  private isNewProductByRoute(event: Event) {
    if (!(event instanceof NavigationEnd)) return false 
    if (!this.productId) return true 
    
    const rx = new RegExp(this.productId ?? '.*')
    return !rx.test((event).url)
  }

  @After(function(this: ProductComponent) { this.onProductsChange() })
  private setProductId() {
    const productId = this.route.snapshot.paramMap.get('productId')
    if(productId === CrudModes.Create) {
      this.mode = CrudModes.Create
    } else {
      this.productId = productId
    }
    this.onProductChange()
  }

  private onProductChange(_state?: ProductsSource) {
    // we were given a product id from the route. We find our product:
    this.product = {
      ...this.localService.products
        ?.find(factoryHasValue('id', is(this.productId))) ?? factoryProduct()
    }
  }

  private onProductsChange(_state?: ProductsSource) {
    this.onProductChange()

    // we need to populate the dropdown for product category
    this.productSchema.category.datalist =
      Array.from(new Set(this.localService.products?.map(x => x.category)))

    this.isLoading = false
  }

  private onProductsUpdateComplete(state: ProductsSource) {
    const productIndex = (this.localService.products ?? [])
      .findIndex(factoryHasValue('id', is(this.product?.id)))

    if ((state[Endpoints.ProductsPut]?.status ?? 500) < 300) { // on success
      //preconditions
      if (productIndex > -1 && this.product && this.localService.products) { 
        // update our local copy of the product and reset the view to read mode
        this.localService.products[productIndex] = this.product
        this.mode = CrudModes.Read
      }
    } else if (productIndex > -1 && this.localService.products) { // on failure
      // reflect the actual state of the product (restore to its previous state)
      this.product = this.localService.products[productIndex]
      // TODO: toast 
    }
    // don't forget to release the spinner!
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
