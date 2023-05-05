import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Observable, catchError, map, retry, throwError } from 'rxjs';
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

  getProductForCategory(categoryName: string): Observable<any> {
    const url = 'http://localhost:5000/product/' + categoryName;

    const headers = new HttpHeaders().set(
      'Content-Type',
      'text/plain;charset=utf8'
    );
    const requestOptions: Object = { headers: headers, responseType: 'text' };

    return this._http.get<any>(url, requestOptions).pipe(
      map((res) => JSON.parse(res) as Array<Product>),
      retry(3),
      catchError(this.handleError)
    );
  }
}
