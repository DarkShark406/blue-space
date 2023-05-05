import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  constructor(private http: HttpClient) {}
  url = 'http://localhost:5000/product/top-sales/';
  getTopSales(categoryName: string) {
    return this.http.get<any[]>(this.url + categoryName);
  }
}
