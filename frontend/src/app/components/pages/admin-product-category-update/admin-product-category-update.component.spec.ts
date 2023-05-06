import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminProductCategoryUpdateComponent } from './admin-product-category-update.component';

describe('AdminProductCategoryUpdateComponent', () => {
  let component: AdminProductCategoryUpdateComponent;
  let fixture: ComponentFixture<AdminProductCategoryUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminProductCategoryUpdateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminProductCategoryUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
