import { Cart } from './cart';
import { Product } from './product';

export class User {
  id!: string;
  email!: string;
  name!: string;
  address!: string;
  isAdmin!: boolean;
  cart!: Cart;
  token!: string;
}
export class IUserLogin {
  email!: string;
  password!: string;
}
export class IUserRegister {
  name!: string;
  email!: string;
  password!: string;
  confirmPassword!: string;
  address!: string;
}
