import { Component } from '@angular/core';
import { AdminProductCategoryService } from 'src/app/services/admin-product-category.service';

@Component({
  selector: 'app-admin-product-category',
  templateUrl: './admin-product-category.component.html',
  styleUrls: ['./admin-product-category.component.css'],
})
export class AdminProductCategoryComponent {
  categories: any;
  errMessage: string = '';

  selectedProduct: string = '';

  constructor(private _service: AdminProductCategoryService) {
    this._service.getCategorys().subscribe({
      next: (data) => (this.categories = data),
      error: (err) => (this.errMessage = err),
    });
  }

  showModal() {
    const deleteCourseModal = document.getElementById('delete-course-modal');
    if (deleteCourseModal) {
      deleteCourseModal.classList.add('show');
    }
  }

  hideModal() {
    const deleteCourseModal = document.getElementById('delete-course-modal');
    if (deleteCourseModal) {
      deleteCourseModal.classList.remove('show');
    }
  }

  saveSelectedProduct(productId: string) {
    this.selectedProduct = productId;
    this.showModal();
  }

  deleteProduct() {
    this._service.deleteCategory(this.selectedProduct).subscribe({
      next: (data) => (this.categories = data),
      error: (err) => (this.errMessage = err),
    });

    this.hideModal();
  }
}
