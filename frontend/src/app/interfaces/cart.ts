import { Product } from './product';

export class Cart {
  items: CartItem[] = [];
  totalPrice: number = 0;
  totalCount: number = 0;
}
export class CartItem {
  constructor(public product: Product) {}
  quantity: number = 1;
  price: number = this.product.productPrice;
}
