import { Router } from "express";
import { Product, ProductModel } from "../models/product.model";
import { sample_products } from "../assets/data/products";

const router = Router();

// Import data to DB
router.get("/seed", async (req, res) => {
  // const productCount = await ProductModel.countDocuments();
  // if (productCount > 0) {
  //   res.send("Seed is already done!");
  //   return;
  // }
  // await ProductModel.create(sample_products);
  res.send(sample_products);
});

router.get("/", (req: any, res: any) => {
  res.send("OK");
});

router.get("/newproduct", async (req, res) => {
  let product = new Product();
  product.productName = "Laptop Asus";

  await ProductModel.create(product);
  res.json(product);
});

export default router;
