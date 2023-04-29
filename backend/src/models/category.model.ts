import { Schema, model } from "mongoose";

export interface Category {
  CategoryId: number;
  CategoryName: string;
  CategoryImage: string;
}

export const CategorySchema = new Schema<Category>(
  {
    CategoryId: { type: Number, required: true },
    CategoryName: { type: String, required: true },
    CategoryImage: { type: String, required: true },
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

export const CategoryModel = model<Category>("category", CategorySchema);
