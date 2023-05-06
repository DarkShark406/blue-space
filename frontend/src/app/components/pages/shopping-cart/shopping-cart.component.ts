import { Component } from '@angular/core';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css'],
})
export class ShoppingCartComponent {
  onClickMakePayment() {
    const popupLogIn = document.getElementById('modal') as HTMLDivElement;
    popupLogIn.style.display = 'block';
  }
}
