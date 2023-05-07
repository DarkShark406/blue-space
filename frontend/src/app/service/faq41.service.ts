import { Injectable } from '@angular/core';
import {catchError, map, Observable, retry, throwError} from "rxjs";
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import { IFAQ41 } from './interface/FAQ41';

@Injectable({
  providedIn: 'root'
})
export class FAQ41Service {
  private _url:string="./assets/FAQ41.json"
    constructor(private _http:HttpClient) {}
    getfaq41():Observable<IFAQ41[]>{
      return this._http.get<IFAQ41[]>(this._url)
    }
}
