import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NavItem } from '../interfaces/nav-item';

@Injectable({
  providedIn: 'root',
})
export class HeaderService {
  constructor(private http: HttpClient) {}
  getNavItem() {
    return this.http.get<NavItem[]>(
      'http://localhost:5000/category/brands-by-category'
    );
  }
}
