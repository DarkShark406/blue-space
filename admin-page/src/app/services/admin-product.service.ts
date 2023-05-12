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

  getCategoryById(id: number) {
    const url = 'http://localhost:5000/category';
    console.log(url + '/id/' + id);
    return this.http.get<Category>(url + '/id/' + id);
  }

  getProducts(): Observable<any> {
    const url = 'http://localhost:5000/product';

    return this.http.get<Product[]>(url);
  }

  getProductById(id: string) {
    const url = 'http://localhost:5000/product';
    return this.http.get<Product>(url + '/id/' + id);
  }

  getProductForCategory(categoryName: string) {
    const url = 'http://localhost:5000/category/' + categoryName;

    return this.http.get<any>(url);
  }

  getProductBySort(sortType: string) {
    const url = 'http://localhost:5000/product/sort/' + sortType;

    return this.http.get<Product[]>(url);
  }

  handleError(error: HttpErrorResponse) {
    return throwError(() => new Error(error.message));
  }

  postProduct(aProduct: any): Observable<any> {
    console.log(aProduct);
    const url = 'http://localhost:5000/product/new';
    const headers = new HttpHeaders().set(
      'Content-Type',
      'application/json;charset=utf-8'
    );
    const requestOptions: Object = { headers: headers, responseType: 'text' };

    return this.http
      .post<any>(url, JSON.stringify(aProduct), requestOptions)
      .pipe(
        map((res) => JSON.parse(res) as Product),
        retry(3),
        catchError(this.handleError)
      );
  }

  putProduct(aProduct: any): Observable<any> {
    const url = 'http://localhost:5000/product/update';
    const headers = new HttpHeaders().set(
      'Content-Type',
      'application/json;charset=utf-8'
    );
    const requestOptions: Object = { headers: headers, responseType: 'text' };
    return this.http
      .put<any>(url, JSON.stringify(aProduct), requestOptions)
      .pipe(
        map((res) => JSON.parse(res) as Array<Product>),
        retry(3),
        catchError(this.handleError)
      );
  }

  deleteProduct(productId: string): Observable<any> {
    const url = 'http://localhost:5000/product/delete/' + productId;
    console.log(url);
    const headers = new HttpHeaders().set(
      'Content-Type',
      'application/json;charset=utf-8'
    );
    const requestOptions: Object = { headers: headers, responseType: 'text' };
    return this.http.delete<any>(url, requestOptions).pipe(
      map((res) => JSON.parse(res) as Array<Product>),
      retry(3),
      catchError(this.handleError)
    );
  }

  deleteImagesProductByID(productId: string) {
    const url = 'http://localhost:5000/images/delete/' + productId;
    console.log(url);
    // this.http.delete<boolean>(url).subscribe(
    //   (response) => {
    //     if (response === true) {
    //       console.log('Đã xóa');
    //     }
    //   },
    //   (error) => {
    //     console.error(error);
    //     console.log('Có lỗi xảy ra');
    //   }
    // );
  }
  getDeletedProduct() {
    return this.http.get<any>('http://localhost:5000/product/deletedProduct');
  }
  restoreProduct(id: string) {
    const body = { id };
    return this.http.put<any>('http://localhost:5000/product/restore', body);
  }
}
