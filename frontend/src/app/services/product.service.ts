import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../interfaces/product';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private http: HttpClient) {}
  url = 'http://localhost:5000/product/';
  getProductById(id: string) {
    return this.http.get<Product>(this.url + '/id/' + id);
  }
  getComboProduct(id: string) {
    return this.http.get<Product[]>(this.url + 'combo-product/' + id);
  }
}
