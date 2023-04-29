import { Router } from "express";
import { User, UserModel } from "../models/user.model";
import { Product } from "../models/product.model";
const router = Router();

router.get("/register", async (req, res) => {
  const newUser: User = {
    id: "",
    name: "Lam",
    email: "lelam200212",
    password: "123",
    address: "null",
    isAdmin: false,
    cart: [],
  };

  await UserModel.create(newUser);
  res.send("Successfully!");
});

export default router;
