import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { EntitiesComponent } from './entities.component';
import { EntityCreateComponent } from './entity-create/entity-create.component';
import { EntityReadComponent } from './entity-read/entity-read.component';
import { EntityUpdateComponent } from './entity-update/entity-update.component';
import { EntityDeleteComponent } from './entity-delete/entity-delete.component';
import { LoadingSectionModule } from '~common/components/loading/loading-section.module';


@NgModule({
  declarations: [
    EntitiesComponent,
    EntityCreateComponent,
    EntityReadComponent,
    EntityUpdateComponent,
    EntityDeleteComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    LoadingSectionModule
  ],
  exports: [
    EntityCreateComponent,
    EntityReadComponent,
    EntityUpdateComponent,
    EntityDeleteComponent
  ]
})
export class EntitiesModule { }
