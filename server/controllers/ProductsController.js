import Product from "../models/Product.js";
import Shop from "../models/Shop.js";
import { validationResult } from "express-validator";
import * as fs from "fs";

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

  async getProductsByShopUrl(req, res) {
    try {
      const shopUrl = req.params.shopUrl;
      const productType = req.query.type;

      let query = { shop: shopUrl };

      if (productType) {
        query = { ...query, type: productType };
      }

      const products = await Product.find(query);
      res.status(200).json(products);
    } catch (err) {
      res.status(404).json({ message: err.message });
    }
  }

  async getProductTypesByShopUrl(req, res) {
    try {
      const shopUrl = req.params.shopUrl;
      const productTypes = await Product.distinct("type", { shop: shopUrl });

      res.status(200).json(productTypes);
    } catch (err) {
      res.status(500).json({ message: err.message });
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

      const { title, description, type, price, shop } = req.body;

      const existingProduct = await Product.findOne({ title: title });

      if (existingProduct) {
        return res.status(422).json({ message: "This product exists already" });
      }

      console.log(shop);
      const existingShop = await Shop.findOne({ url: shop });

      if (!existingShop) {
        return res
          .status(404)
          .json({ message: "Could not find shop for provided id" });
      }

      let imagePath;
      if (req.file) {
        imagePath = req.file.path;
      } else {
        imagePath = null;
      }

      const newProduct = new Product({
        title,
        description,
        type,
        price,
        image: imagePath,
        shop,
      });

      await newProduct.save();
      await Shop.findOneAndUpdate(
        { url: shop },
        {
          $push: { products: newProduct.id },
        },
      );

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

      const { title, description, type, price } = req.body;
      const productId = req.params.productId;

      const product = await Product.findById(productId);

      if (!product) {
        return res.status(404).json({
          message: "Something went wrong, could not find a product",
        });
      }

      product.title = title;
      product.description = description;
      product.type = type;
      product.price = price;

      if (req.file) {
        if (product.image) {
          fs.unlinkSync(product.image);
        }
        product.image = req.file.path;
      }

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

      if (product.image) {
        fs.unlinkSync(product.image);
      }

      await Shop.findOneAndUpdate(
        { url: product.shop },
        {
          $pull: { products: productId },
        },
      );

      res.status(200).json({ message: "Product deleted successfully" });
    } catch (err) {
      res.status(404).json({ message: err.message });
    }
  }
}

export default new ProductsController();
