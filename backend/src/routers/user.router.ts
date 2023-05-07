import { Router } from "express";
import { User, UserModel } from "../models/user.model";
import { Product } from "../models/product.model";
import { HTTP_BAD_REQUEST } from "../constants/http_status";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const router = Router();

router.get("/seed", async (req, res) => {
  const { name, email, password, address } = req.body;
  const encryptedPassword = await bcrypt.hash(password, 10);

  const newUser: User = {
    id: "",
    name,
    email: email.toLowerCase(),
    password: encryptedPassword,
    address,
    isAdmin: false,
    cart: [],
  };
  const dbUser = await UserModel.create(newUser);
  res.send(generateTokenReponse(dbUser));
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await UserModel.findOne({ email });
  if (user && (await bcrypt.compare(password, user.password))) {
    res.send(generateTokenReponse(user));
  } else {
    res.send("Username or password is invalid!");
  }
});

router.post("/register", async (req, res) => {
  const { name, email, password, address } = req.body;
  const user = await UserModel.findOne({ email });
  if (user) {
    res.status(HTTP_BAD_REQUEST).send("User is already exist, please login!");
    return;
  }

  const encryptedPassword = await bcrypt.hash(password, 10);

  const newUser: User = {
    id: "",
    name,
    email: email.toLowerCase(),
    password: encryptedPassword,
    address,
    isAdmin: false,
    cart: [],
  };

  const dbUser = await UserModel.create(newUser);
  res.send(generateTokenReponse(dbUser));
});

const generateTokenReponse = (user: User) => {
  const token = jwt.sign(
    {
      id: user.id,
      email: user.email,
      isAdmin: user.isAdmin,
    },
    "Secret Key",
    {
      expiresIn: "30d",
    }
  );

  return {
    id: user.id,
    email: user.email,
    name: user.name,
    address: user.address,
    isAdmin: user.isAdmin,
    cart: user.cart,
    token: token,
  };
};

export default router;