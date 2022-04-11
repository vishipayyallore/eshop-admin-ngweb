import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { factoryHasValue } from '~common/utilities/factory-has-value';
import { is } from '~common/utilities/is';
import { Product } from '~/app/products/product.interface';
import { LocalService } from '~/app/products/services/local.service';
import { ProductModes } from './product-modes';
import { productSchema } from './product-schema';

declare const structuredClone: Function; 

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  product?: Product
  productId: string | null = null
  productSchema = structuredClone(productSchema)
  
  isCreateMode = false
  isReadMode = true
  isUpdateMode = false
  isDeleteMode = false
  private _mode: ProductModes = ProductModes.Read
  get mode(): ProductModes {
    return this._mode
  }
  set mode(value: ProductModes){
    this._mode = value
    this.isCreateMode = value === ProductModes.Create
    this.isReadMode = value === ProductModes.Read
    this.isUpdateMode = value === ProductModes.Update
    this.isDeleteMode = value === ProductModes.Delete
  }

  constructor(
    private route: ActivatedRoute,
    private localService: LocalService
  ) { }

  ngOnInit(): void {
    this.productId = this.route.snapshot.paramMap.get('productId')
    this.localService.state$.subscribe(this.onStateChange.bind(this))
  }

  private onStateChange(state: any){
    if(state.hasOwnProperty('products')){
      this.product = this.localService.products
        ?.find(factoryHasValue('id', is(this.productId)))
      this.productSchema.category.datalist = 
        Array.from(new Set(this.localService.products?.map(x => x.category)))
    }
  }

  onCreate(){
    this.localService.createProduct(this.product)
  }
  onUpdate(){
    this.localService.updateProduct(this.product)
  }
  onDelete(){
    if(this.product?.id){
      this.localService.deleteProduct(this.product.id)
    }
  }
}
