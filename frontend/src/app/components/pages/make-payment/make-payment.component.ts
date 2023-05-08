import { Component } from '@angular/core';
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { Cart, CartItem } from 'src/app/interfaces/cart';
import { CartProductService } from 'src/app/services/cart-product.service';

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
  ngOnInit() {
    const openButton = document.querySelector(
      '.make-payment'
    ) as HTMLButtonElement;

    const closeButton = document.querySelector(
      '.close-popup'
    ) as HTMLButtonElement;

    const modal = document.querySelector('.modal') as HTMLElement;

    const messageFullname = document.getElementById(
      'message-fullname'
    ) as HTMLInputElement;
    const inputFullName = document.getElementById(
      'full-name'
    ) as HTMLInputElement;

    const messagePhonenumber = document.getElementById(
      'message-phone-number'
    ) as HTMLInputElement;
    const inputPhonenumber = document.getElementById(
      'phone-number'
    ) as HTMLInputElement;

    const messageCity = document.getElementById(
      'message-city'
    ) as HTMLInputElement;
    const selectCity = document.getElementById('city') as HTMLInputElement;

    const messageDistrict = document.getElementById(
      'message-district'
    ) as HTMLInputElement;
    const selectDistrict = document.getElementById(
      'districts'
    ) as HTMLInputElement;

    const messageWard = document.getElementById(
      'message-ward'
    ) as HTMLInputElement;
    const selectWard = document.getElementById('wards') as HTMLInputElement;

    const messageDetailAddress = document.getElementById(
      'message-detail-address'
    ) as HTMLInputElement;
    const inputDetailAddress = document.getElementById(
      'detail-address'
    ) as HTMLInputElement;

    const messagePaymentMethod = document.getElementById(
      'message-payment-method'
    ) as HTMLInputElement;
    const selectPaymentCOD = document.getElementById(
      'payment-cod'
    ) as HTMLInputElement;
    const selectPaymentATM = document.getElementById(
      'payment-atm'
    ) as HTMLInputElement;
    const selectPaymentVisaCard = document.getElementById(
      'payment-visa-card'
    ) as HTMLInputElement;
    const selectPaymentMomo = document.getElementById(
      'payment-momo'
    ) as HTMLInputElement;
    const selectPaymentZalopay = document.getElementById(
      'payment-zalopay'
    ) as HTMLInputElement;

    // const messageFormatPhone = document.getElementById(
    //   'message-format-phone'
    // ) as HTMLInputElement;

    // Remove ERROR
    inputFullName.oninput = function () {
      messageFullname.style.display = 'none';
    };
    inputPhonenumber.oninput = function () {
      messagePhonenumber.style.display = 'none';
    };
    selectCity.oninput = function () {
      messageCity.style.display = 'none';
    };
    selectDistrict.oninput = function () {
      messageDistrict.style.display = 'none';
    };
    selectWard.oninput = function () {
      messageWard.style.display = 'none';
    };
    inputDetailAddress.oninput = function () {
      messageDetailAddress.style.display = 'none';
    };

    selectPaymentCOD.onchange = function () {
      messagePaymentMethod.style.display = 'none';
    };
    selectPaymentATM.onchange = function () {
      messagePaymentMethod.style.display = 'none';
    };
    selectPaymentVisaCard.onchange = function () {
      messagePaymentMethod.style.display = 'none';
    };
    selectPaymentMomo.onchange = function () {
      messagePaymentMethod.style.display = 'none';
    };
    selectPaymentZalopay.onchange = function () {
      messagePaymentMethod.style.display = 'none';
    };

    // Mở modal khi click vào button Thanh toán
    openButton.addEventListener('click', () => {
      console.log('vào nút thanh toán');
      if (inputFullName.value === '') {
        alert('Bạn chưa nhập Họ và tên.');
        messageFullname.style.display = 'block';
        inputFullName.focus();
        return;
      }
      if (inputPhonenumber.value === '') {
        alert('Bạn chưa nhập Số điện thoại.');
        messagePhonenumber.style.display = 'block';
        inputPhonenumber.focus();
        return;
      }
      if (selectCity.value === '') {
        alert('Bạn chưa chọn Tỉnh/thành phố.');
        messageCity.style.display = 'block';
        selectCity.focus();
        return;
      }
      if (selectDistrict.value === '') {
        alert('Bạn chưa chọn Quận/Huyện.');
        messageDistrict.style.display = 'block';
        selectDistrict.focus();
        return;
      }
      if (selectWard.value === '') {
        alert('Bạn chưa chọn Xã/Phường.');
        messageWard.style.display = 'block';
        selectWard.focus();
        return;
      }
      if (inputDetailAddress.value === '') {
        alert('Bạn chưa nhập địa chỉ chi tiết.');
        messageDetailAddress.style.display = 'block';
        inputDetailAddress.focus();
        return;
      }
      if (
        selectPaymentCOD.checked == false &&
        selectPaymentATM.checked == false &&
        selectPaymentVisaCard.checked == false &&
        selectPaymentMomo.checked == false &&
        selectPaymentZalopay.checked == false
      ) {
        alert('Bạn chưa chọn phương thức thanh toán.');
        messagePaymentMethod.style.display = 'block';
        return;
      } else {
        modal.style.display = 'block';
      }
    });

    // Đóng modal khi click vào button đóng
    closeButton.addEventListener('click', () => {
      modal.style.display = 'none';
    });

    // Đóng modal khi click bên ngoài
    window.addEventListener('click', (event) => {
      if (event.target === modal) {
        modal.style.display = 'none';
      }
    });

    // Tự đóng modal sau 10 giây
    setTimeout(() => {
      modal.style.display = 'none';
    }, 10000);
  }

  // Chọn địa chỉ
  cities: City[] = [];
  districts: District[] = [];
  wards: Ward[] = [];
  selectedCity = '';
  selectedDistrict = '';
  selectedWard = '';

  cart = new Cart();

  constructor(private cartService: CartProductService) {
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
}
