import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductsModule } from './products/products.module';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { EntitiesModule } from './entitities/entities.module';
import { AppConfigurationService } from './common/services/configuration/app-configuration.service';
import config from '~config';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    EntitiesModule,
    ProductsModule,
  ],
  providers: [
    AppConfigurationService.forRoot(),
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
