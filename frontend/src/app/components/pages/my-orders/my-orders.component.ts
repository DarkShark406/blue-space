import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Order } from 'src/app/interfaces/order';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css'],
})
export class MyOrdersComponent {
  order: Order = new Order();
  id = '';
  api: any;
  city: any;
  district: any;
  ward: any;
  constructor(
    private activatedRoute: ActivatedRoute,
    private orderService: OrderService
  ) {
    this.id = this.activatedRoute.snapshot.params['orderId'];
  }
  ngOnInit() {
    this.orderService.trackOrderById(this.id).subscribe((d) => {
      this.order = d;
      this.orderService.getAddress().subscribe((d) => {
        this.city = d.find((city: any) => city.Id == this.order.city);
        this.district = this.city.Districts.find(
          (d: any) => d.Id == this.order.district
        );
        this.ward = this.district.Wards.find(
          (w: any) => w.Id == this.order.ward
        );
      });
    });
  }
}
