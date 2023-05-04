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
router.get("/search/:searchTerm", async (req, res) => {
	const searchTerm = req.params.searchTerm;
	const regex = new RegExp(searchTerm, "i");
	const products = await ProductModel.find({ productName: { $regex: regex } });
	res.send(products);
});

router.get("/brand/:categoryId", async (req, res) => {
	try {
		const { categoryId } = req.params;

		const brands = await ProductModel.distinct("productBrand", { categoryId });

		res.json(brands);
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: "Server error" });
	}
});

export default router;
