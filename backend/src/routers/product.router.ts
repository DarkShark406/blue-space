import { Router } from "express";
import { Product, ProductModel } from "../models/product.model";
import { CategoryModel } from "../models/category.model";
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

// Trả về danh sách sản phẩm theo categoryName
// Ví dụ theo laptop, theo phone
router.get("/:categoryName", async (req, res) => {
	const categoryName = req.params["categoryName"];
	const category = await CategoryModel.findOne({
		categoryName: categoryName,
	});

	if (category) {
		const categoryId = category.categoryId;
		const data = await ProductModel.find({ categoryId: categoryId });
		res.send(data);
	} else {
		res.status(404).json({ message: "Category not found" });
	}
});

router.get("/", async (req, res) => {
  const data = await ProductModel.find();
  res.send(data);
});

router.get("/search/:searchTerm", async (req, res) => {
  const searchTerm = req.params.searchTerm;
  const regex = new RegExp(searchTerm, "i");
  const products = await ProductModel.find({ productName: { $regex: regex } });
  res.send(products);
});

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

export default router;
