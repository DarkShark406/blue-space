import { Component } from '@angular/core';
import { AdminOrderService } from 'src/app/services/admin-order.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-admin-order',
  templateUrl: './admin-order.component.html',
  styleUrls: ['./admin-order.component.css'],
})
export class AdminOrderComponent {
  orders: any;
  constructor(
    private orderService: AdminOrderService,
    private userService: UserService
  ) {
    // this.orderService.getOrders().subscribe((d) => {
    //   this.orders = d;
    // });
  }
  ngOnInit() {
    this.orderService.getOrders().subscribe((d) => {
      this.orders = d;
    });
  }
}
