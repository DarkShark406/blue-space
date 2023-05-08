import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Order } from '../interfaces/order';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  constructor(private http: HttpClient) {}
  url = 'http://localhost:5000/orders/';

  create(order: Order) {
    return this.http.post<Order>(this.url + 'create', order);
  }
  getNewOrderForCurrentUser(): Observable<Order> {
    return this.http.get<Order>(this.url + '/newOrderForCurrentUser');
  }
  pay(order: Order): Observable<string> {
    return this.http.post<string>(this.url + 'pay', order);
  }
  trackOrderById(id: number): Observable<Order> {
    return this.http.get<Order>(this.url + 'track/' + id);
  }
}
