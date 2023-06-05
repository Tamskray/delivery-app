import * as path from "path";
import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";

import dotenv from "dotenv";
dotenv.config();

import ShopsRouter from "./routes/ShopsRouter.js";
import ProductsRouter from "./routes/ProductsRouter.js";
import OrdersRouter from "./routes/OrdersRouter.js";

const app = express();

app.use(bodyParser.json());

app.use(cors());

app.use("/assets/images", express.static(path.join("assets", "images")));

app.use((error, req, res, next) => {
  res.status(error.code || 500);
  res.json({ message: error.message || "An unknown error occurred!" });
});

app.use("/api/shops", ShopsRouter);
app.use("/api/products", ProductsRouter);
app.use("/api/orders", OrdersRouter);

app.use((req, res, next) => {
  res.status(404).json({ message: "Could not find this route" });
});

mongoose
  .connect(
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.yxlqhm6.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`
  )
  .then(() => {
    app.listen(process.env.PORT || 5000);
  })
  .catch((err) => {
    console.log(err);
  });
