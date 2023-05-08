import { Router } from "express";
const aboutus = require("../assets/data/aboutus");
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

router.get("/about-us", async (req, res) => {
  res.send(aboutus);
});

export default router;
