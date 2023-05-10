import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Order } from 'src/app/interfaces/order';
import { AdminOrderService } from 'src/app/services/admin-order.service';

@Component({
  selector: 'app-admin-order-detail',
  templateUrl: './admin-order-detail.component.html',
  styleUrls: ['./admin-order-detail.component.css'],
})
export class AdminOrderDetailComponent implements OnInit {
  order = new Order();

  city: any;
  district: any;
  ward: any;

  constructor(
    private orderService: AdminOrderService,
    private route: ActivatedRoute,
    private location: Location
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.params['id'];
    console.log(id);
    this.orderService.getOrderById(id).subscribe((d) => {
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

  goBack() {
    this.location.back();
  }

  calculateTotalPrice() {
    return this.order.items.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
  }
}
