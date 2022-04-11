import { 
  Directive, Input, OnChanges, 
  SimpleChanges, TemplateRef, ViewContainerRef 
} from '@angular/core';

import { LoadingSectionComponent } from '~/app/common/components/loading/loading-section.component';


@Directive({
  selector: '[appLoadingSection]'
})
export class LoadingSectionDirective implements OnChanges {
  @Input() appLoadingSection: boolean = true;

  constructor(
    private templateRef: TemplateRef<any>, 
    private viewContainerRef: ViewContainerRef
  ) {}

  ngOnChanges(changes: SimpleChanges) {
    if(changes.hasOwnProperty('appLoadingSection')) {
      this.toggleView(changes['appLoadingSection'].currentValue);
    }
  }

  toggleView(isLoading: boolean) {
    this.viewContainerRef.clear()

    if (isLoading) {
      this.viewContainerRef
        .createComponent(LoadingSectionComponent)
    } else{
      this.viewContainerRef.createEmbeddedView(this.templateRef)
    }  
  }
}
