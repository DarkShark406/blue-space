import { Component } from '@angular/core';
import { AdminProductService } from 'src/app/services/admin-product.service';

@Component({
  selector: 'app-admin-product',
  templateUrl: './admin-product.component.html',
  styleUrls: ['./admin-product.component.css'],
})
export class AdminProductComponent {
  products: any;
  errMessage: string = '';

  selectedProduct: string = '';

  categories: any;

  constructor(private _service: AdminProductService) {
    // Get all category
    this._service.getCategories().subscribe({
      next: (data) => (this.categories = data),
      error: (err) => (this.errMessage = err),
    });

    // Get all products
    this._service.getProducts().subscribe({
      next: (data) => (this.products = data),
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
    this._service.deleteProduct(this.selectedProduct).subscribe({
      next: (data) => (this.products = data),
      error: (err) => (this.errMessage = err),
    });

    this.hideModal();
  }
}
