import express from "express";
import cors from "cors";
import productRouter from "./src/routers/product.router";

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

// Running port
const port = 9000;
app.listen(port, () => {
  console.log("Webserver running at http://localhost:" + port);
});
