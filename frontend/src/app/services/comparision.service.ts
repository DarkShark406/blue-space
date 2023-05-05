import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../interfaces/product';

@Injectable({
  providedIn: 'root',
})
export class ComparisionService {
  constructor(private http: HttpClient) {}
  getComparisionProduct(id1: string, id2: string) {
    return this.http.get<Product[]>(
      'http://localhost:5000/product/compare/' + id1 + '/' + id2
    );
  }
}
