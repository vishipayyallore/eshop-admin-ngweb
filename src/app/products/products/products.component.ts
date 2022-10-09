import { ChangeDetectorRef, Component, ElementRef, OnChanges, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';

import { ChangeDetecting } from '~common/utilities/change-detecting.decorator';
import { LocalService } from '~/app/products/services/local.service';
import { Product } from '~/app/products/product.interface';
import { ProductsSource } from '~/app/products/products-source.interface';
import { environment } from '~/environments/environment';
import config from '~/config';
import { TargetEvent } from '~/app/common/utilities/target-event';
import { filter, Subscription } from 'rxjs';
import { CrudModes } from '~/app/entitities/entity-crud/crud-modes';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  @ViewChild('category') categoryRef!: ElementRef<HTMLInputElement>

  @ChangeDetecting() categories: Array<string>=[]
  @ChangeDetecting() category?: string
  products: Array<Product>=[]
  filteredProducts: Array<Product>=[]

  private subscriptions = new Subscription()
  environment = environment;
  cdnHost = config['cdnHost'];
  isProductFocused?: boolean;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private cd: ChangeDetectorRef,
    private localService: LocalService
  ) {}

  ngOnInit(): void {
    this.localService.getProducts()

    this.subscriptions.add(this.router.events
      .pipe(filter(e => e instanceof NavigationEnd))
      .subscribe(this.configureIsProductFocused.bind(this)))
    this.subscriptions.add(this.localService.state$
      .subscribe(this.onProductChange.bind(this)))
    
    this.configureIsProductFocused()
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe()
  }

  private configureIsProductFocused() {
    this.isProductFocused = /products\/.+$/.test(this.router.url)
  }

  private onProductChange(state: ProductsSource) {
    if(state.hasOwnProperty('products')){
      this.products = state.products
      this.categories = Array.from(new Set(
        (this.localService.products ?? [])
        .map(x => x.category)))
      this.filterProducts()
    }
  }

  private filterProducts() { 
    this.filteredProducts = !this.category?.length
      ? this.products
      : this.products.filter(p => p.category === this.category)
  }

  onChangeCategories(event: Event) {
    const e = event as TargetEvent<string>;
    this.category = e.target.value ?? undefined
    this.filterProducts()
  }

  onBack() {
    this.router.navigate(['products'])
  }

  onNewProduct() {
    this.router.navigate(['products/' + String(CrudModes.Create)])
  }
}
