import { Router } from "express";
import { Product, ProductModel } from "../models/product.model";
import { CategoryModel } from "../models/category.model";
import mongoose from "mongoose";
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

// Search sản phẩm theo name
router.get("/search/:searchTerm", async (req, res) => {
  const searchTerm = req.params.searchTerm;
  const regex = new RegExp(searchTerm, "i");
  const products = await ProductModel.find({ productName: { $regex: regex } });
  res.send(products);
});

// Lấy 2 sản phẩm so sánh
router.get("/compare/:id1/:id2", async (req, res) => {
  try {
    const product1 = await ProductModel.findById(req.params.id1);
    const product2 = await ProductModel.findById(req.params.id2);

    if (!product1 || !product2) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json([product1, product2]);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
});

// Filter sản phẩm theo chức năng
router.get("/filter/:categoryName", async (req, res) => {
  const categoryName = req.params["categoryName"];
  if (categoryName == "laptop") {
    const screen = req.query.screen?.toString().split(",");
    const ram = req.query.ram?.toString().split(",");
    const category = await CategoryModel.findOne({
      categoryName: categoryName,
    });

    if (category && ram && screen) {
      const categoryId = category.categoryId;

      const products = await ProductModel.find({
        categoryId: categoryId,
        "specifications.screen": {
          $regex: new RegExp(screen.join("|"), "i"),
        },
        "specifications.ram": {
          $regex: new RegExp(ram.join("|"), "i"),
        },
      });

      res.send(products);
    }
  } else {
    res.status(404).json({ message: "Category not found" });
  }
});

// Lấy top sales theo categoryName
router.get("/top-sales/:categoryName", async (req, res) => {
  const categoryName = req.params.categoryName;

  const category = await CategoryModel.findOne({ categoryName });
  if (category) {
    const categoryId = category.categoryId;

    const products = await ProductModel.aggregate([
      {
        $match: {
          categoryId: categoryId,
        },
      },
      {
        $lookup: {
          from: "categories",
          localField: "categoryId",
          foreignField: "categoryId",
          as: "category",
        },
      },
      {
        $project: {
          _id: 1,
          productName: 1,
          ratingPoint: 1,
          numberReview: 1,
          categoryName: "$category.categoryName",
        },
      },
      {
        $unwind: "$categoryName",
      },
      {
        $sort: { ratingPoint: -1, numberReview: -1 },
      },
      {
        $limit: 4,
      },
    ]);

    res.send(products);
  } else res.send("Not found!");
});

// Product by id
router.get("/:id", async (req, res) => {
  const id = req.params.id;
  const data = await ProductModel.findById(id);
  res.send(data);
});

export default router;
