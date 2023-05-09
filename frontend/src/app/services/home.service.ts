import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../interfaces/product';

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  constructor(private http: HttpClient) {}
  url = 'http://localhost:5000/product/';
  getTopSales(categoryName: string) {
    return this.http.get<any[]>(this.url + 'top-sales/' + categoryName);
  }
  getProductByTag(tag: string) {
    return this.http.get<Product[]>(this.url + 'tag/' + tag);
  }
  getTopDiscount(categoryName: string) {
    return this.http.get<Product[]>(this.url + '/topDiscount/' + categoryName);
  }
}
