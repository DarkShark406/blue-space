import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Customer } from '../interfaces/customer';
import { Order } from '../interfaces/order';

@Injectable({
  providedIn: 'root',
})
export class AdminCustomerService {
  constructor(private http: HttpClient) {}

  getUsers() {
    const url = 'http://localhost:5000/auth/get-users';

    return this.http.get<Customer[]>(url);
  }

  getUserById(id: string) {
    const url = 'http://localhost:5000/auth/get-user/' + id;

    return this.http.get<Customer>(url);
  }

  getNumberOrderByCustomerId(id: string) {
    const url = 'http://localhost:5000/orders/listOrderCustomer/' + id;

    return this.http.get<Order[]>(url);
    // const numberOrder = 0
    // for (let i=0;i<orders.length;i++){

    // }
  }
}
