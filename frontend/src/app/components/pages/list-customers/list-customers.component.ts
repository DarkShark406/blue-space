import { Component } from '@angular/core';
// import { ListCustomersService } from '../list-customers.service';

@Component({
  selector: 'app-list-customers',
  templateUrl: './list-customers.component.html',
  styleUrls: ['./list-customers.component.css'],
})
export class ListCustomersComponent {
  customers: any;
  loyalcustomers: any;
  potentialcustomers: any;
  allCustomers = true;
  loyalCustomers = false;
  potentialCustomers = false;
  showallCustomers() {
    this.allCustomers = true;
    this.loyalCustomers = false;
    this.potentialCustomers = false;
  }
  showloyalCustomers() {
    this.allCustomers = false;
    this.loyalCustomers = true;
    this.potentialCustomers = false;
  }
  showpotentialCustomers() {
    this.allCustomers = false;
    this.loyalCustomers = false;
    this.potentialCustomers = true;
  }

  //   constructor(private _cservice: ListCustomersService){

  //     this._cservice.getCustomers().subscribe({
  //       next:(data1)=>{this.customers=data1}
  //     })

  //     this._cservice.getLoyalCustomers().subscribe({
  //       next:(data2)=>{this.loyalcustomers=data2}
  //     })

  //     this._cservice.getPotentialCustomers().subscribe({
  //       next:(data3)=>{this.potentialcustomers=data3}
  //     })
  // }
}
