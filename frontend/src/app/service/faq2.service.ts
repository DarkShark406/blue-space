import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IFAQ2 } from '../interface/faq2';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class Faq2Service{
    private _url:string="./assets/data/faq2.json"
    constructor(private _http:HttpClient) {}
        getfaq2():Observable<IFAQ2[]>{
            return this._http.get<IFAQ2[]>(this._url)
        }
    }