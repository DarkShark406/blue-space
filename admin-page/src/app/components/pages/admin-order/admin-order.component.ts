import { Component } from '@angular/core';
import { AdminOrderService } from 'src/app/services/admin-order.service';

@Component({
  selector: 'app-admin-order',
  templateUrl: './admin-order.component.html',
  styleUrls: ['./admin-order.component.css'],
})
export class AdminOrderComponent {
  orders: any;
  constructor(private orderService: AdminOrderService) {
    this.orderService.getOrders().subscribe({
      next: (data) => (this.orders = data),
    });
  }
}
