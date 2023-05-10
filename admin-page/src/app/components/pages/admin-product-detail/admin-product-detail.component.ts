import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs';
import { Category } from 'src/app/interfaces/category';
import { Product } from 'src/app/interfaces/product';
import { AdminProductService } from 'src/app/services/admin-product.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-admin-product-detail',
  templateUrl: './admin-product-detail.component.html',
  styleUrls: ['./admin-product-detail.component.css'],
})
export class AdminProductDetailComponent implements OnInit {
  product = new Product();
  category = new Category();
  errMessage: string = '';

  constructor(
    private _service: AdminProductService,
    private route: ActivatedRoute,
    private location: Location
  ) {
    // Get id of product
    this.product.id = this.route.snapshot.params['id'];

    console.log(this.product.categoryId);
  }

  ngOnInit(): void {
    this._service.getProductById(this.product.id).subscribe({
      next: (data) => {
        this.product = data;

        console.log(this.product.categoryId);

        this._service.getCategoryById(this.product.categoryId).subscribe({
          next: (data) => (this.category = data),
          error: (err) => (this.errMessage = err),
        });
      },
      error: (err) => (this.errMessage = err),
    });
  }

  goBack() {
    this.location.back();
  }
}
