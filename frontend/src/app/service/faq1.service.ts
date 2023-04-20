import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IFAQ1 } from '../interface/faq1';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class Faq1Service{
    private _url:string="./assets/data/faq1.json"
    constructor(private _http:HttpClient) {}
        getfaq1():Observable<IFAQ1[]>{
            return this._http.get<IFAQ1[]>(this._url)
        }
    }