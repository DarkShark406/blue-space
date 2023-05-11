import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Cart } from 'src/app/interfaces/cart';
import { Customer } from 'src/app/interfaces/customer';
import { Order } from 'src/app/interfaces/order';
import { AdminCustomerService } from 'src/app/services/admin-customer.service';
import { AdminOrderService } from 'src/app/services/admin-order.service';

@Component({
  selector: 'app-admin-customer',
  templateUrl: './admin-customer.component.html',
  styleUrls: ['./admin-customer.component.css'],
})
export class AdminCustomerComponent implements OnInit {
  customers: Customer[] = [];
  ordersOfCustomer: Order[] = [];
  cusOrders: any;

  constructor(
    private customerService: AdminCustomerService,
    private orderService: AdminOrderService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.customerService.getUsers().subscribe((d) => {
      this.customers = d;
    });
  }

  viewDetails(id: string) {
    this.router.navigate(['customers', 'details', id]);
  }
}
