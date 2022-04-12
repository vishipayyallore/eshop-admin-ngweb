import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntityCrudComponent } from './entity-crud.component';

describe('EntityReadComponent', () => {
  let component: EntityCrudComponent;
  let fixture: ComponentFixture<EntityCrudComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EntityCrudComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EntityCrudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
