import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Cart, CartItem } from 'src/app/interfaces/cart';
import { CartProductService } from 'src/app/services/cart-product.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css'],
})
export class ShoppingCartComponent implements OnInit {
  cart = new Cart();

  constructor(
    private cartService: CartProductService,
    private router: Router,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.cart = this.cartService.getCart();
    this.calculateTotalMoney();
  }

  calculateTotalMoney() {
    this.cart.totalPrice = 0;

    for (let i = 0; i < this.cart.items.length; i++) {
      this.cart.totalPrice +=
        this.cart.items[i].price * this.cart.items[i].quantity;
    }
    this.cartService.saveCartToLocalStorage(this.cart);
  }

  onClickMakePayment() {
    const userLS = localStorage.getItem('User');
    if (userLS == null) {
      // Bật modal
      const popupLogIn = document.getElementById('modal') as HTMLDivElement;
      popupLogIn.style.display = 'block';
    } else {
      this.router.navigate(['make-payment']);
    }
  }

  closeModel() {
    const popupLogIn = document.getElementById('modal') as HTMLDivElement;
    popupLogIn.style.display = 'none';
  }

  deleteCartItem(item: CartItem) {
    this.cart.items = this.cartService.deleteCartItem(this.cart, item);
    this.calculateTotalMoney();
    this.cartService.saveCartToLocalStorage(this.cart);
  }

  saveCartToLocalStorage() {
    this.cartService.saveCartToLocalStorage(this.cart);
  }

  deleteAllCart() {
    this.cart.items = [];
    this.calculateTotalMoney();
    this.cartService.saveCartToLocalStorage(this.cart);
  }
  back() {
    this.router.navigateByUrl('/products');
  }
}
