import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IFAQ3 } from '../interface/faq3';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class Faq3Service{
    private _url:string="./assets/data/faq3.json"
    constructor(private _http:HttpClient) {}
        getfaq3():Observable<IFAQ3[]>{
            return this._http.get<IFAQ3[]>(this._url)
        }
    }