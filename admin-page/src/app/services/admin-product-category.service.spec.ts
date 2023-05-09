import { TestBed } from '@angular/core/testing';

import { AdminProductCategoryService } from './admin-product-category.service';

describe('AdminProductCategoryService', () => {
  let service: AdminProductCategoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminProductCategoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
