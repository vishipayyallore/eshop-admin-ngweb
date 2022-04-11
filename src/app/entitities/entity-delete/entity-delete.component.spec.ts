import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntityDeleteComponent } from './entity-delete.component';

describe('EntityDeleteComponent', () => {
  let component: EntityDeleteComponent;
  let fixture: ComponentFixture<EntityDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EntityDeleteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EntityDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
