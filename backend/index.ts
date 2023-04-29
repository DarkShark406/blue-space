// Database
import dotenv from "dotenv";
dotenv.config();

import { dbConnect } from "./src/configs/database.config";
dbConnect();

import express from "express";
import cors from "cors";
import productRouter from "./src/routers/product.router";
import userRouter from "./src/routers/user.router";
import categoryRouter from "./src/routers/category.router";

const app = express();
app.use(
  cors({
    credentials: true,
    origin: ["http://localhost:9001"],
  })
);

app.get("/", (req, res) => {
  res.send("Hello Server");
});

// Router
app.use("/product", productRouter);
app.use("/category", categoryRouter);
app.use("/login", userRouter);

// Running port
const port = 5000;
app.listen(port, () => {
  console.log("Webserver running at http://localhost:" + port);
});
