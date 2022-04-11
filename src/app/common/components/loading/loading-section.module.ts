import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoadingSectionDirective } from './loading-section.directive';
import { LoadingSectionComponent } from './loading-section.component';


@NgModule({
  declarations: [ 
    LoadingSectionComponent,
    LoadingSectionDirective 
  ],
  imports: [
    CommonModule
  ],
  exports: [ 
    LoadingSectionComponent,
    LoadingSectionDirective 
  ]
})
export class LoadingSectionModule { }
