import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AboutUsService {
  constructor(private http: HttpClient) {}
  getAboutUs() {
    return this.http.get<any>('http://localhost:5000/images/about-us');
  }
}
