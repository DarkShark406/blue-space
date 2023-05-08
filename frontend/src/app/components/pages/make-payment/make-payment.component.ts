import { Component } from '@angular/core';
import { Route, Router } from '@angular/router';
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { Cart, CartItem } from 'src/app/interfaces/cart';
import { Order } from 'src/app/interfaces/order';
import { CartProductService } from 'src/app/services/cart-product.service';
import { OrderService } from 'src/app/services/order.service';
import { UserService } from 'src/app/services/user.service';

interface City {
  Id: string;
  Name: string;
  Districts: District[];
}

interface District {
  Id: string;
  Name: string;
  Wards: Ward[];
}

interface Ward {
  Id: string;
  Name: string;
}

@Component({
  selector: 'app-make-payment',
  templateUrl: './make-payment.component.html',
  styleUrls: ['./make-payment.component.css'],
})
export class MakePaymentComponent {
  validateForm() {
    let isValid = true;
    let fullnameInput = document.getElementById(
      'full-name'
    ) as HTMLInputElement;
    let phoneInput = document.getElementById(
      'phone-number'
    ) as HTMLInputElement;
    let citySelect = document.getElementById('city') as HTMLSelectElement;
    let districtSelect = document.getElementById(
      'districts'
    ) as HTMLSelectElement;
    let wardSelect = document.getElementById('wards') as HTMLSelectElement;
    let streetInput = document.getElementById(
      'detail-address'
    ) as HTMLInputElement;
    let errorMessageFullname = document.getElementById(
      'message-fullname'
    ) as HTMLElement;
    let errorMessagePhone = document.getElementById(
      'message-phone-number'
    ) as HTMLElement;
    let errorMessageCity = document.getElementById(
      'message-city'
    ) as HTMLElement;
    let errorMessageDistrict = document.getElementById(
      'message-district'
    ) as HTMLElement;
    let errorMessageWard = document.getElementById(
      'message-ward'
    ) as HTMLElement;
    let errorMessageStreet = document.getElementById(
      'message-detail-address'
    ) as HTMLElement;

    // Validate full name
    if (this.fullname.trim() === '') {
      fullnameInput.classList.add('invalid-input');
      errorMessageFullname.style.display = 'block';
      isValid = false;
    } else {
      fullnameInput.classList.remove('invalid-input');
      errorMessageFullname.style.display = 'none';
    }

    // Validate phone number
    let phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(this.phone)) {
      phoneInput.classList.add('invalid-input');
      errorMessagePhone.style.display = 'block';
      isValid = false;
    } else {
      phoneInput.classList.remove('invalid-input');
      errorMessagePhone.style.display = 'none';
    }

    // Validate city
    if (this.selectedCity === '') {
      citySelect.classList.add('invalid-input');
      errorMessageCity.style.display = 'block';
      isValid = false;
    } else {
      citySelect.classList.remove('invalid-input');
      errorMessageCity.style.display = 'none';
    }

    // Validate district
    if (this.selectedDistrict === '') {
      districtSelect.classList.add('invalid-input');
      errorMessageDistrict.style.display = 'block';
      isValid = false;
    } else {
      districtSelect.classList.remove('invalid-input');
      errorMessageDistrict.style.display = 'none';
    }
    
    // Validate ward
    if (this.selectedWard === '') {
      wardSelect.classList.add('invalid-input');
      errorMessageWard.style.display = 'block';
      isValid = false;
    } else {
      wardSelect.classList.remove('invalid-input');
      errorMessageWard.style.display = 'none';
    }

    // Validate street
    if (this.street.trim() === '') {
      streetInput.classList.add('invalid-input');
      errorMessageStreet.style.display = 'block';
      isValid = false;
    } else {
      streetInput.classList.remove('invalid-input');
      errorMessageStreet.style.display = 'none';
    }

    return isValid;
  }
  // Chọn địa chỉ
  cities: City[] = [];
  districts: District[] = [];
  wards: Ward[] = [];
  selectedCity = '';
  selectedDistrict = '';
  selectedWard = '';

  cart = new Cart();

  constructor(
    private cartService: CartProductService,
    private orderService: OrderService,
    private userService: UserService,
    private router: Router
  ) {
    // Xử lý select tỉnh, huyện xã
    const Parameter: AxiosRequestConfig = {
      url: 'https://raw.githubusercontent.com/kenzouno1/DiaGioiHanhChinhVN/master/data.json',
      method: 'GET',
      responseType: 'json',
    };

    axios(Parameter).then((result) => {
      this.cities = result.data;
    });

    this.cart = this.cartService.getCart();

    this.calculateTotalMoney();
  }

  onCityChange() {
    this.districts = [];
    this.wards = [];
    this.selectedDistrict = '';
    this.selectedWard = '';
    if (this.selectedCity) {
      const result = this.cities.filter((n) => n.Id === this.selectedCity);
      this.districts = result[0].Districts;
    }
  }

  onDistrictChange() {
    this.wards = [];
    this.selectedWard = '';
    if (this.selectedDistrict) {
      const dataCity = this.cities.filter((n) => n.Id === this.selectedCity);
      const dataWards = dataCity[0].Districts.filter(
        (n) => n.Id === this.selectedDistrict
      )[0].Wards;
      this.wards = dataWards;
    }
  }

  saveCartToLocalStorage() {
    this.cartService.saveCartToLocalStorage(this.cart);
  }

  calculateTotalMoney() {
    this.cart.totalPrice = 0;

    for (let i = 0; i < this.cart.items.length; i++) {
      this.cart.totalPrice +=
        this.cart.items[i].price * this.cart.items[i].quantity;
    }
    this.cartService.saveCartToLocalStorage(this.cart);
  }

  deleteCartItem(item: CartItem) {
    this.cart.items = this.cartService.deleteCartItem(this.cart, item);
    this.calculateTotalMoney();
    this.cartService.saveCartToLocalStorage(this.cart);
  }

  deleteAllCart() {
    this.cart.items = [];
    this.calculateTotalMoney();
    this.cartService.saveCartToLocalStorage(this.cart);
  }

  order: Order = new Order();
  fullname = '';
  phone = '';
  street = '';
  discount = 0;

  createOrder() {
    if (this.validateForm()) {
      this.order.items = this.cart.items;
      this.order.totalPrice = Math.round(
        (this.cart.totalPrice - this.discount) / 23000
      );
      this.order.name = this.fullname;
      this.order.phone = this.phone;

      this.order.city = this.selectedCity;
      this.order.district = this.selectedDistrict;
      this.order.ward = this.selectedWard;
      this.order.street = this.street;

      this.orderService.create(this.order).subscribe({
        next: () => {},
        error: (errorResponse) => {
          alert(errorResponse.error);
        },
      });
      // this.orderService.getNewOrderForCurrentUser().subscribe({
      //   next: (order) => {
      //     this.order = order;
      //   },
      //   error: () => {},
      // });
    }
  }
}
