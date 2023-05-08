import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IFAQ, IFAQ1 } from '../interfaces/FAQ';

@Injectable({
  providedIn: 'root',
})
export class FAQService {
  faq1: any;

  constructor(private _http: HttpClient) {}

  getfaq1(): Observable<IFAQ[]> {
    const _url: string = '../assets/dataQuanKim/faq1.json';
    return this._http.get<IFAQ[]>(_url);
  }

  getfaq2(): Observable<IFAQ[]> {
    const _url: string = '../assets/dataQuanKim/faq2.json';

    return this._http.get<IFAQ[]>(_url);
  }
  getfaq3(): Observable<IFAQ[]> {
    const _url: string = '../assets/dataQuanKim/faq3.json';

    return this._http.get<IFAQ[]>(_url);
  }

  getfaq4(): Observable<IFAQ[]> {
    const _url: string = '../assets/dataQuanKim/faq4.json';

    return this._http.get<IFAQ[]>(_url);
  }

  getfaq41(): Observable<IFAQ1[]> {
    const _url: string = '../assets/dataQuanKim/FAQ41.json';

    return this._http.get<IFAQ1[]>(_url);
  }
}
