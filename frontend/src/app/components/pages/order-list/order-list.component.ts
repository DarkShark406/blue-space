import { Component } from '@angular/core';
import { Order } from 'src/app/interfaces/order';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css'],
})
export class OrderListComponent {
  orders: Order[] = [];
  constructor(private orderService: OrderService) {}
  ngOnInit() {
    this.orderService.getListOrder().subscribe((d) => {
      this.orders = d;
      console.log(this.orders);
    });
  }
}
