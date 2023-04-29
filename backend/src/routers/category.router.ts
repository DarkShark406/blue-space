import { Router } from "express";
const sample_category = require("../assets/data/category");
import { CategoryModel } from "../models/category.model";

const router = Router();

router.get("/seed", async (req, res) => {
  const productCount = await CategoryModel.countDocuments();
  if (productCount > 0) {
    res.send("Seed is already done!");
    return;
  }
  await CategoryModel.create(sample_category);
  res.send("Seed is done <3");
});

router.get("/", async (req, res) => {
  const data = await CategoryModel.find();
  res.send(data);
});

export default router;
