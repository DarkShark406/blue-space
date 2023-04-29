import { Component } from '@angular/core';
// import { OrdersService } from '../orders.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css'],
})
export class OrdersComponent {
  orders: any;
  completedorders: any;
  uncompletedorders: any;
  allOrders = true;
  completedOrders = false;
  uncompletedOrders = false;
  showallOrders() {
    this.allOrders = true;
    this.completedOrders = false;
    this.uncompletedOrders = false;
  }
  showcompletedOrders() {
    this.allOrders = false;
    this.completedOrders = true;
    this.uncompletedOrders = false;
  }
  showuncompletedOrders() {
    this.allOrders = false;
    this.completedOrders = false;
    this.uncompletedOrders = true;
  }

  //   constructor(private _cservice: OrdersService){

  //     this._cservice.getOrders().subscribe({
  //       next:(data1)=>{this.orders=data1}
  //     })

  //     this._cservice.getCompletedOrders().subscribe({
  //       next:(data2)=>{this.completedorders=data2}
  //     })

  //     this._cservice.getUnCompletedOrders().subscribe({
  //       next:(data3)=>{this.uncompletedorders=data3}
  //     })
  // }
}
