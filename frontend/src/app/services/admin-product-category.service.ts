import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, retry, throwError } from 'rxjs';
import { Category } from '../interfaces/category';

@Injectable({
  providedIn: 'root',
})
export class AdminProductCategoryService {
  constructor(private _http: HttpClient) {}
  getCategorys(): Observable<any> {
    const headers = new HttpHeaders().set(
      'Content-Type',
      'text/plan;charset=utf-8'
    );
    const requestOptions: Object = {
      headers: headers,
      responseType: 'text',
    };
    return this._http.get<any>('/categories', requestOptions).pipe(
      map((res) => JSON.parse(res) as Array<Category>),
      retry(3),
      catchError(this.handleError)
    );
  }

  handleError(error: HttpErrorResponse) {
    return throwError(() => new Error(error.message));
  }

  getCategoryDetails(categoryId: string): Observable<any> {
    const headers = new HttpHeaders().set(
      'Content-Type',
      'text/plain;charset=utf8'
    );

    const requestOptions: Object = {
      headers: headers,
      responseType: 'text',
    };

    return this._http
      .get<any>('/categories/' + categoryId, requestOptions)
      .pipe(
        map((res) => JSON.parse(res) as Category),
        retry(3),
        catchError(this.handleError)
      );
  }

  postCategory(aCategory: any): Observable<any> {
    const headers = new HttpHeaders().set(
      'Content-Type',
      'application/json;charset=utf-8'
    );
    const requestOptions: Object = { headers: headers, responseType: 'text' };
    return this._http
      .post<any>('/categories', JSON.stringify(aCategory), requestOptions)
      .pipe(
        map((res) => JSON.parse(res) as Array<Category>),
        retry(3),
        catchError(this.handleError)
      );
  }

  putCategory(âCtegory: any): Observable<any> {
    const headers = new HttpHeaders().set(
      'Content-Type',
      'application/json;charset=utf-8'
    );
    const requestOptions: Object = { headers: headers, responseType: 'text' };
    return this._http
      .put<any>('/categories', JSON.stringify(âCtegory), requestOptions)
      .pipe(
        map((res) => JSON.parse(res) as Array<Category>),
        retry(3),
        catchError(this.handleError)
      );
  }

  deleteCategory(categorytId: string): Observable<any> {
    const headers = new HttpHeaders().set(
      'Content-Type',
      'application/json;charset=utf-8'
    );
    const requestOptions: Object = { headers: headers, responseType: 'text' };
    return this._http
      .delete<any>('/categories/' + categorytId, requestOptions)
      .pipe(
        map((res) => JSON.parse(res) as Array<Category>),
        retry(3),
        catchError(this.handleError)
      );
  }
}
