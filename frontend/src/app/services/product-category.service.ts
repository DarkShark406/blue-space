import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { catchError, map, Observable, retry, throwError } from 'rxjs';
import { Product } from '../interfaces/product';

@Injectable({
  providedIn: 'root',
})
export class ProductCategoryService {
  constructor(private _http: HttpClient) {}

  handleError(error: HttpErrorResponse) {
    return throwError(() => new Error(error.message));
  }

  getAllProduct() {
    return this._http.get<Product[]>('http://localhost:5000/product/');
  }

  getProductForCategory(categoryName: string) {
    const url = 'http://localhost:5000/category/' + categoryName;

    return this._http.get<any>(url);
  }

  getProductForCategoryAndBrand(categoryName: string, brand: string) {
    const url = 'http://localhost:5000/category/' + categoryName + '/' + brand;

    return this._http.get<any>(url);
  }

  getProductForBrand(brand: string) {
    const url = 'http://localhost:5000/product/brand/' + brand;

    return this._http.get<any>(url);
  }

  filterProduct(categoryName: string, filter: any): Observable<any> {
    const url = 'http://localhost:5000/product/filter/' + categoryName;
    const headers = new HttpHeaders().set(
      'Content-Type',
      'application/json;charset=utf-8'
    );
    const requestOptions: Object = { headers: headers, responseType: 'text' };

    return this._http
      .post<any>(url, JSON.stringify(filter), requestOptions)
      .pipe(
        map((res) => JSON.parse(res) as Array<Product>),
        retry(3),
        catchError(this.handleError)
      );
  }

  filterAllProduct(filter: any): Observable<any> {
    const url = 'http://localhost:5000/product/filter/';
    const headers = new HttpHeaders().set(
      'Content-Type',
      'application/json;charset=utf-8'
    );
    const requestOptions: Object = { headers: headers, responseType: 'text' };

    return this._http
      .post<any>(url, JSON.stringify(filter), requestOptions)
      .pipe(
        map((res) => JSON.parse(res) as Array<Product>),
        retry(3),
        catchError(this.handleError)
      );
  }

  sortProducts(typeSort: string, products: any) {
    const url = 'http://localhost:5000/product/sort/' + typeSort;

    const headers = new HttpHeaders().set(
      'Content-Type',
      'application/json;charset=utf-8'
    );
    const requestOptions: Object = { headers: headers, responseType: 'text' };

    return this._http
      .post<any>(url, JSON.stringify(products), requestOptions)
      .pipe(
        map((res) => JSON.parse(res) as Array<Product>),
        retry(3),
        catchError(this.handleError)
      );
  }
}
