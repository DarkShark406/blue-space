import { Router } from "express";
const path = require("path");

const router = Router();

// Trả về hình ảnh của từng sản phẩm theo productId
router.get("/products/:productId/:imageName", (req, res) => {
	const productId = req.params["productId"];
	const imageName = req.params["imageName"];
	const pathProductsImages = path.join(
		__dirname,
		"..",
		"assets",
		"images",
		"products"
	);

	res.sendFile(pathProductsImages + "/" + productId + "/" + imageName);
});

export default router;
