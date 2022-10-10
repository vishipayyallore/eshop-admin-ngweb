import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { ProductsComponent } from './products/products.component';
import { ProductComponent } from './product/product.component';
import { PrettyPrintPipe } from '../common/pipes/pretty-print.pipe';
import { ProductsRoutingModule } from './products-routing.module';
import { ProductServicesModule } from './services/product-services.module';
import { LocalService } from './services/local.service';
import { EntitiesModule } from '~/app/entitities/entities.module';
import { LoadingSectionModule } from '~common/components/loading/loading-section.module';
import { AppConfigurationService } from '../common/services/configuration/app-configuration.service';
import { Endpoints } from '~/config/environments/endpoints';


@NgModule({
  declarations: [
    ProductsComponent,
    ProductComponent,
    PrettyPrintPipe
  ],
  providers: [ PrettyPrintPipe, LocalService ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    ProductsRoutingModule,
    ProductServicesModule,
    EntitiesModule,
    LoadingSectionModule
  ],
  exports: [
    ProductsComponent,
    ProductComponent
  ]
})
export class ProductsModule {
  constructor(private appConfig: AppConfigurationService) {
    this.appConfig.getConfiguration(Endpoints.ProductsConfiguration)
  }
}
