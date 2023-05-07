import { Injectable } from '@angular/core';
import {catchError, map, Observable, retry, throwError} from "rxjs";
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import { IFAQ4 } from './interface/FAQ4';

@Injectable({
  providedIn: 'root'
})
export class FAQ4Service {
private _url:string="./assets/FAQ4.json"
  constructor(private _http:HttpClient) {}
  getfaq4():Observable<IFAQ4[]>{
    return this._http.get<IFAQ4[]>(this._url)
  }
}
