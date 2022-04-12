import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntityReadComponent } from './entity-read.component';

describe('EntityReadComponent', () => {
  let component: EntityReadComponent;
  let fixture: ComponentFixture<EntityReadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EntityReadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EntityReadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
