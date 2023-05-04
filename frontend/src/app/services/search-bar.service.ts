import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SearchBarService {
  constructor(private http: HttpClient) {}

  getData(searchTerm: string) {
    return this.http.get<any[]>(
      'http://localhost:5000/product/search/' + searchTerm
    );
  }
}
