import { Router } from "express";
const sample_category = require("../assets/data/category");
import { CategoryModel } from "../models/category.model";
import { ProductModel } from "../models/product.model";

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

router.get("/brands-by-category", async (req, res) => {
  try {
    const results = await ProductModel.aggregate([
      {
        $lookup: {
          from: "categories",
          localField: "categoryId",
          foreignField: "categoryId",
          as: "category",
        },
      },
      {
        $unwind: "$category",
      },
      {
        $group: {
          _id: "$categoryId",
          category: { $first: "$category.categoryName" },
          brands: { $addToSet: "$productBrand" },
        },
      },
    ]);

    res.send(results);
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Server error" });
  }
});

export default router;
