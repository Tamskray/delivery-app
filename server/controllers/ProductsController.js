import Product from "../models/Product.js";
import Shop from "../models/Shop.js";
import { validationResult } from "express-validator";

class ProductsController {
  async getProducts(req, res) {
    try {
      const products = await Product.find();
      res.status(200).json(products);
    } catch (err) {
      res.status(404).json({ message: err.message });
    }
  }

  async getProductById(req, res) {
    try {
      const productId = req.params.productId;
      const product = await Product.findById(productId);
      res.status(200).json(product);
    } catch (err) {
      res.status(404).json({ message: err.message });
    }
  }

  async getProductsByShopId(req, res) {
    try {
      const shopId = req.params.shopId;
      const products = await Product.find({ shop: shopId });

      res.status(200).json(products);
    } catch (err) {
      res.status(404).json({ message: err.message });
    }
  }

  async createProduct(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res
          .status(400)
          .json({ message: "Error with creating product", errors });
      }

      const { title, type, price, shop } = req.body;

      const existingProduct = await Product.findOne({ title: title });

      if (existingProduct) {
        return res.status(422).json({ message: "This product exists already" });
      }

      const existingShop = await Shop.findById(shop);

      if (!existingShop) {
        return res
          .status(404)
          .json({ message: "Could not find shop for provided id" });
      }

      // hardcode image only for fast create product for examples
      const newProduct = new Product({
        title,
        type,
        price,
        image: `assets\\images\\${title}.jpg`,
        shop,
      });

      await newProduct.save();
      await Shop.findByIdAndUpdate(shop, {
        $push: { products: newProduct.id },
      });

      res.status(201).json(newProduct);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  async updateProduct(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res
          .status(400)
          .json({ message: "Error with creating product", errors });
      }

      const { title, type, price } = req.body;
      const productId = req.params.productId;

      const product = await Product.findById(productId);

      if (!product) {
        return res.status(404).json({
          message: "Something went wrong, could not find a product",
        });
      }

      product.title = title;
      product.type = type;
      product.price = price;

      await product.save();

      res.status(200).json(product);
    } catch (err) {
      res.status(404).json({ message: err.message });
    }
  }

  async deleteProduct(req, res) {
    try {
      const productId = req.params.productId;

      const product = await Product.findById(productId);

      if (!product) {
        return res.status(404).json({
          message: "Something went wrong, could not find a product",
        });
      }

      await Product.findByIdAndDelete(productId);
      await Shop.findByIdAndUpdate(product.shop, {
        $pull: { products: productId },
      });

      res.status(200).json({ message: "Product deleted successfully" });
    } catch (err) {
      res.status(404).json({ message: err.message });
    }
  }
}

export default new ProductsController();
