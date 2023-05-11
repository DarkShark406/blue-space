import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Customer } from 'src/app/interfaces/customer';
import { Order } from 'src/app/interfaces/order';
import { AdminCustomerService } from 'src/app/services/admin-customer.service';
import { AdminOrderService } from 'src/app/services/admin-order.service';

@Component({
  selector: 'app-admin-customer-detail',
  templateUrl: './admin-customer-detail.component.html',
  styleUrls: ['./admin-customer-detail.component.css'],
})
export class AdminCustomerDetailComponent implements OnInit {
  customer = new Customer();
  ordersCus: Order[] = [];

  constructor(
    private customerService: AdminCustomerService,
    private orderService: AdminOrderService,
    private location: Location,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.params['id'];
    this.customerService.getUserById(id).subscribe((d) => {
      this.customer = d;
    });

    this.orderService.getCustomerOrder(id).subscribe((d) => {
      this.ordersCus = d;
    });
  }

  goBack() {
    this.location.back();
  }

  viewOrderDetails(orderId: number) {
    this.router.navigate(['orders', 'details', orderId]);
  }
}
