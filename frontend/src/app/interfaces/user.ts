import { Product } from './product';

export class User {
  id!: string;
  email!: string;
  name!: string;
  address!: string;
  isAdmin!: boolean;
  cart!: Product[];
}
export interface IUserLogin {
  email: string;
  password: string;
}
export interface IUserRegister {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  address: string;
}
