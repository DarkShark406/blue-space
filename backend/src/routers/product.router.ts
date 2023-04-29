import { Router } from "express";
import { Product, ProductModel } from "../models/product.model";
const sample_products = require("../assets/data/products");

const router = Router();

// Import data to DB
router.get("/seed", async (req, res) => {
  const productCount = await ProductModel.countDocuments();
  if (productCount > 0) {
    res.send("Seed is already done!");
    return;
  }
  await ProductModel.create(sample_products);

  res.send("Seed is done, Lam");
});

router.get("/", async (req, res) => {
  const data = await ProductModel.find();
  res.send(data);
});

export default router;
