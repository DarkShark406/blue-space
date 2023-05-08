import { Component } from '@angular/core';
import { Cart, CartItem } from 'src/app/interfaces/cart';
import { CartProductService } from 'src/app/services/cart-product.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css'],
})
export class ShoppingCartComponent {
  cart = new Cart();

  constructor(private cartService: CartProductService) {
    this.cart = this.cartService.getCart();

    console.log(this.cart);
    this.calculateTotalMoney();
  }

  calculateTotalMoney() {
    this.cart.totalPrice = 0;

    for (let i = 0; i < this.cart.items.length; i++) {
      this.cart.totalPrice +=
        this.cart.items[i].price * this.cart.items[i].quantity;
    }
    this.saveCartToLocalStorage();
  }

  onClickMakePayment() {
    const popupLogIn = document.getElementById('modal') as HTMLDivElement;
    popupLogIn.style.display = 'block';
  }

  deleteCartItem(item: CartItem) {
    this.cart.items = this.cartService.deleteCartItem(this.cart, item);
    this.calculateTotalMoney();
    this.saveCartToLocalStorage();
  }

  saveCartToLocalStorage() {
    const userLS = localStorage.getItem('user');
    if (userLS != null) {
      let user = JSON.parse(userLS);
      user.cart = this.cart;
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      const cartLS = localStorage.getItem('cart');
      if (cartLS != null) {
        let cart = JSON.parse(cartLS);
        cart = this.cart;
        localStorage.setItem('cart', JSON.stringify(cart));
      }
    }
  }

  deleteAllCart() {
    this.cart.items = [];
    this.calculateTotalMoney();
    this.saveCartToLocalStorage();
  }
}
