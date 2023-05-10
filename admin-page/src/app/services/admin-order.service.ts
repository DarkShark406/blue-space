import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Order } from '../interfaces/order';

@Injectable({
  providedIn: 'root',
})
export class AdminOrderService {
  constructor(private http: HttpClient) {}

  getOrders() {
    const url = 'http://localhost:5000/orders';
    return this.http.get<Order[]>(url);
  }

  getOrderById(id: string) {
    const url = 'http://localhost:5000/orders/track/' + id;
    return this.http.get<Order>(url);
  }

  getAddress() {
    return this.http.get<any>('http://localhost:5000/images/address');
  }
}
