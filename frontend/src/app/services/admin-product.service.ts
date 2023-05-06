import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, retry, throwError } from 'rxjs';
import { Product } from '../interfaces/product';

@Injectable({
  providedIn: 'root',
})
export class AdminProductService {
  constructor(private _http: HttpClient) {}
  getProducts(): Observable<any> {
    const headers = new HttpHeaders().set(
      'Content-Type',
      'text/plan;charset=utf-8'
    );
    const requestOptions: Object = {
      headers: headers,
      responseType: 'text',
    };
    return this._http.get<any>('/products', requestOptions).pipe(
      map((res) => JSON.parse(res) as Array<Product>),
      retry(3),
      catchError(this.handleError)
    );
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

    return this._http.get<any>('/products/' + productId, requestOptions).pipe(
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
    return this._http
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
    return this._http
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
    return this._http
      .delete<any>('/products/' + productId, requestOptions)
      .pipe(
        map((res) => JSON.parse(res) as Array<Product>),
        retry(3),
        catchError(this.handleError)
      );
  }
}
