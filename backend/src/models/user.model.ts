import { Schema, model } from "mongoose";
import { Product } from "./product.model";

export class CartItem {
  constructor(public product: Product) {}
  quantity: number = 1;
  // price: number = this.product.price;
}
export class Cart {
  items: CartItem[] = [];
  totalPrice: number = 0;
  totalCount: number = 0;
}

export interface User {
  id: string;
  email: string;
  password: string;
  name: string;
  address: string;
  isAdmin: boolean;
  cart: CartItem[];
}

export const UserSchema = new Schema<User>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    address: { type: String, required: true },
    isAdmin: { type: Boolean, required: true },
    cart: { type: [CartItem], required: false },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
    toObject: {
      virtuals: true,
    },
  }
);

export const UserModel = model<User>("user", UserSchema);
