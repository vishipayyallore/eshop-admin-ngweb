import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { environment } from '~/environments/environment';
import { EntitiesComponent } from './entitities/entities.component';
import { ProductsComponent } from './products/products/products.component';


const routes: Routes = [
  { path: '', component: EntitiesComponent },
  { 
    path: 'products', 
    loadChildren: () => import('./products/products.module')
      .then(m => m.ProductsModule) 
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes /*, { enableTracing: !environment.production } */)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
