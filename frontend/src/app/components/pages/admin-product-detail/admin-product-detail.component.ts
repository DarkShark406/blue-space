import { Component } from '@angular/core';
import { AdminProductService } from 'src/app/services/admin-product.service';

@Component({
  selector: 'app-admin-product-detail',
  templateUrl: './admin-product-detail.component.html',
  styleUrls: ['./admin-product-detail.component.css'],
})
export class AdminProductDetailComponent {
  typeProduct: string = '';

  product: any;
  errMessage: string = '';
  constructor(private _service: AdminProductService) {
    // Get id of product
    var currentUrl = window.location.href;
    var arr = currentUrl.split('/');
    var id = arr[arr.length - 1];

    this._service.getProductDetails(id).subscribe({
      next: (data) => (this.product = data),
      error: (err) => (this.errMessage = err),
    });
  }
}
