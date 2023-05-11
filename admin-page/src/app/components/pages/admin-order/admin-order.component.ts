import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminOrderService } from 'src/app/services/admin-order.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-admin-order',
  templateUrl: './admin-order.component.html',
  styleUrls: ['./admin-order.component.css'],
})
export class AdminOrderComponent implements OnInit {
  orders: any;
  cusOrders: any;
  constructor(
    private orderService: AdminOrderService,

    private userService: UserService,
    private router: Router
  ) {
    // this.orderService.getOrders().subscribe((d) => {
    //   this.orders = d;
    // });
  }
  ngOnInit() {
    this.orderService.getOrders().subscribe((d) => {
      this.orders = d;
    });
    this.orderService
      .getCustomerOrder('64586913301b92c3ea0a4924')
      .subscribe((d) => {
        this.cusOrders = d;
        console.log(d.length);
      });
  }

  viewDetails(id: string) {
    this.router.navigate(['orders', 'details', id]);
  }
}
