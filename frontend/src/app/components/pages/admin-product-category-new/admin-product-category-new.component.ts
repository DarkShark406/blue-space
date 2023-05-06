import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Category } from 'src/app/interfaces/category';
import { AdminProductCategoryService } from 'src/app/services/admin-product-category.service';

@Component({
  selector: 'app-admin-product-category-new',
  templateUrl: './admin-product-category-new.component.html',
  styleUrls: ['./admin-product-category-new.component.css'],
})
export class AdminProductCategoryNewComponent {
  category = new Category();
  categories: any;
  errMessage: string = '';
  isValidSubmit = true;

  constructor(
    private _service: AdminProductCategoryService,
    private router: Router
  ) {
    this._service.getCategorys().subscribe({
      next: (data) => {
        this.categories = data;
      },
      error: (err) => {
        this.errMessage;
      },
    });
  }
  postCategory() {
    this._service.postCategory(this.category).subscribe({
      next: (data) => {
        this.categories = data;
      },
      error: (err) => {
        this.errMessage = err;
      },
    });
    this.router.navigate(['admin-product-category']);
  }

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
