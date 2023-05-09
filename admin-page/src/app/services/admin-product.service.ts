import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, retry, throwError } from 'rxjs';
import { Product } from '../interfaces/product';
import { Category } from '../interfaces/category';

@Injectable({
  providedIn: 'root',
})
export class AdminProductService {
  constructor(private http: HttpClient) {}

  getCategories(): Observable<any> {
    const url = 'http://localhost:5000/category';

    return this.http.get<any>(url);
  }

  getProducts(): Observable<any> {
    const url = 'http://localhost:5000/product';

    return this.http.get<Product[]>(url);
  }

  getProductById(id: string) {
    const url = 'http://localhost:5000/product';
    return this.http.get<Product>(url + '/id/' + id);
  }

  handleError(error: HttpErrorResponse) {
    return throwError(() => new Error(error.message));
  }

  getProductDetails(productId: string): Observable<any> {
    const headers = new HttpHeaders().set(
      'Content-Type',
      'text/plain;charset=utf8'
    );

    const requestOptions: Object = {
      headers: headers,
      responseType: 'text',
    };

    return this.http.get<any>('/products/' + productId, requestOptions).pipe(
      map((res) => JSON.parse(res) as Product),
      retry(3),
      catchError(this.handleError)
    );
  }

  postProduct(aProduct: any): Observable<any> {
    const headers = new HttpHeaders().set(
      'Content-Type',
      'application/json;charset=utf-8'
    );
    const requestOptions: Object = { headers: headers, responseType: 'text' };
    return this.http
      .post<any>('/products', JSON.stringify(aProduct), requestOptions)
      .pipe(
        map((res) => JSON.parse(res) as Array<Product>),
        retry(3),
        catchError(this.handleError)
      );
  }

  putProduct(aProduct: any): Observable<any> {
    const headers = new HttpHeaders().set(
      'Content-Type',
      'application/json;charset=utf-8'
    );
    const requestOptions: Object = { headers: headers, responseType: 'text' };
    return this.http
      .put<any>('/products', JSON.stringify(aProduct), requestOptions)
      .pipe(
        map((res) => JSON.parse(res) as Array<Product>),
        retry(3),
        catchError(this.handleError)
      );
  }

  deleteProduct(productId: string): Observable<any> {
    const headers = new HttpHeaders().set(
      'Content-Type',
      'application/json;charset=utf-8'
    );
    const requestOptions: Object = { headers: headers, responseType: 'text' };
    return this.http.delete<any>('/products/' + productId, requestOptions).pipe(
      map((res) => JSON.parse(res) as Array<Product>),
      retry(3),
      catchError(this.handleError)
    );
  }
}
