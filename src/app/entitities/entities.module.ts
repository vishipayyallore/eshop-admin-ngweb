import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { EntitiesComponent } from './entities.component';
import { EntityCrudComponent } from './entity-crud/entity-crud.component';
import { LoadingSectionModule } from '~common/components/loading/loading-section.module';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    EntitiesComponent,
    EntityCrudComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    LoadingSectionModule
  ],
  exports: [ EntityCrudComponent  ]
})
export class EntitiesModule { }
