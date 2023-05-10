import { CartItem } from './cart';

export class Order {
  id!: number;
  items!: CartItem[];
  totalPrice!: number;
  name!: string;
  phone!: string;
  city!: string;
  district!: string;
  ward!: string;
  street!: string;
  paymentId!: string;
  createdAt!: string;
  status!: string;
}
