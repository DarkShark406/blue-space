import { Cart } from './cart';
import { Product } from './product';

export class Customer {
  id!: string;
  name!: string;
  email!: string;
  address!: string;
  isAdmin!: boolean;
  cart!: Cart;
  createdAt!: string;
}
