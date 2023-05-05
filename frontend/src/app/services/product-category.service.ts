import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Product } from '../interfaces/product';

@Injectable({
  providedIn: 'root',
})
export class ProductCategoryService {
  constructor(private _http: HttpClient) {}

  getAllProduct() {
    return this._http.get<Product[]>('http://localhost:5000/product/');
  }

  getProductForCategory(categoryName: string) {
    const url = 'http://localhost:5000/category/' + categoryName;

    return this._http.get<any>(url);
  }
}
