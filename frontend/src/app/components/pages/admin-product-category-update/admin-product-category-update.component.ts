import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Category } from 'src/app/interfaces/category';
import { AdminProductCategoryService } from 'src/app/services/admin-product-category.service';

@Component({
  selector: 'app-admin-product-category-update',
  templateUrl: './admin-product-category-update.component.html',
  styleUrls: ['./admin-product-category-update.component.css'],
})
export class AdminProductCategoryUpdateComponent {
  category = new Category();
  categories: any;
  errMessage: string = '';
  isValidSubmit = true;

  constructor(
    private _service: AdminProductCategoryService,
    private http: HttpClient
  ) {
    // Get id of product
    var currentUrl = window.location.href;
    var arr = currentUrl.split('/');
    var id = arr[arr.length - 1];

    this._service.getCategoryDetails(id).subscribe({
      next: (data) => (this.category = data),
      error: (err) => (this.errMessage = err),
    });
  }

  // putProduct() {
  //   const now = new Date();
  //   const date = now.toLocaleDateString();
  //   const time = now.toLocaleTimeString();
  //   this.product.updateAt = `${date} - ${time}`;

  //   if (this.coverImageNew) {
  //     this.product.coverImage = this.coverImageNew;
  //   }

  //   console.log(this.product);

  //   this._service.putProduct(this.product).subscribe({
  //     next: (data) => (this.products = data),
  //     error: (err) => (this.errMessage = err),
  //   });
  // }
  // Thông báo invalid
  clearClassInvalid(id: string) {
    document.getElementById(id)?.classList.remove('invalid');
  }

  addClassInvalid(id: string) {
    document.getElementById(id)?.classList.add('invalid');
    document.getElementById(id)?.focus();
  }

  onSubmit() {
    if (this.category.categoryId == '') {
      alert('Thiếu thông tin');
      this.addClassInvalid('category-id');
      this.isValidSubmit = false;
      return;
    }
    if (this.category.categoryName == '') {
      alert('Thiếu thông tin');
      this.addClassInvalid('category-name');
      this.isValidSubmit = false;
      return;
    } else this.isValidSubmit == true;
    alert('Lưu thành công');
  }
}
