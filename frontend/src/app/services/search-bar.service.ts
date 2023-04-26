import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SearchBarService {
  constructor(private http: HttpClient) {}

  getData() {
    return this.http.get<any[]>('https://jsonplaceholder.typicode.com/users');
  }
}
