import Product from "../models/Product.js";
import Shop from "../models/Shop.js";
import { validationResult } from "express-validator";

class ShopsController {
  async getShops(req, res) {
    try {
      const shopType = req.query.type;

      let shops;
      if (shopType) {
        shops = await Shop.find({ type: shopType });
      } else {
        shops = await Shop.find();
      }

      res.status(200).json(shops);
    } catch (err) {
      res.status(404).json({ message: err.message });
    }
  }

  async getShopById(req, res) {
    try {
      const shopId = req.params.shopId;
      const shop = await Shop.findById(shopId);
      res.status(200).json(shop);
    } catch (err) {
      res.status(404).json({ message: err.message });
    }
  }

  async getShopByUrl(req, res) {
    try {
      const shopUrl = req.params.shopUrl;
      console.log(shopUrl);
      const shop = await Shop.findOne({ url: shopUrl });

      if (!shop) {
        return res.status(404).json({ message: "Магазин не знайдено!" });
      }

      res.status(200).json(shop);
    } catch (err) {
      res.status(404).json({ message: err.message });
    }
  }

  async getShopsTypes(req, res) {
    try {
      const shopTypes = await Shop.distinct("type");

      res.status(200).json(shopTypes);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  async createShop(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res
          .status(400)
          .json({ message: "Error with creating shop", errors });
      }

      const { title, type } = req.body;

      const existingShop = await Shop.findOne({ title: title });

      if (existingShop) {
        return res.status(422).json({ message: "This shop exists already" });
      }

      const newShop = new Shop({
        title,
        type,
        image: "",
        products: [],
      });

      await newShop.save();

      res.status(201).json(newShop);
    } catch (err) {
      res.status(409).json({ message: err.message });
    }
  }

  async updateShop(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res
          .status(400)
          .json({ message: "Error with creating shop", errors });
      }

      const { title, type } = req.body;
      const shopId = req.params.shopId;

      const shop = await Shop.findById(shopId);

      if (!shop) {
        return res.status(404).json({
          message: "Something went wrong, could not find a shop",
        });
      }

      shop.title = title;
      shop.type = type;

      await shop.save();

      res.status(200).json(shop);
    } catch (err) {
      res.status(404).json({ message: err.message });
    }
  }

  async deleteShop(req, res) {
    try {
      const shopId = req.params.shopId;

      const shop = await Shop.findById(shopId);

      if (!shop) {
        return res.status(404).json({
          message: "Something went wrong, could not find a shop",
        });
      }

      await Shop.findByIdAndDelete(shopId);
      await Product.deleteMany({ shop: shopId });

      res.status(200).json({ message: "Shop deleted successfully" });
    } catch (err) {
      res.status(404).json({ message: err.message });
    }
  }
}

export default new ShopsController();
