import Order from "../models/Order.js";
import Shop from "../models/Shop.js";
import { validationResult } from "express-validator";

class OrdersController {
  async getOrders(req, res) {
    try {
      const orders = await Order.find();
      res.status(200).json(orders);
    } catch (err) {
      res.status(404).json({ message: err.message });
    }
  }

  async getOrderById(req, res) {
    try {
      const orderId = req.params.orderId;
      const order = await Order.findById(orderId);
      res.status(200).json(order);
    } catch (err) {
      res.status(404).json({ message: err.message });
    }
  }

  async createOrder(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res
          .status(400)
          .json({ message: "Error with creating order", errors });
      }

      const { name, email, phone, address, items, totalPrice, shop } = req.body;

      // const existingShop = await Shop.findById(shop);

      // if (!existingShop) {
      //   return res
      //     .status(404)
      //     .json({ message: "Could not find shop for provided id" });
      // }

      const newOrder = new Order({
        name,
        email,
        phone,
        address,
        items,
        totalPrice,
        // shop,
      });

      await newOrder.save();

      res.status(201).json(newOrder);
    } catch (err) {
      res.status(409).json({ message: err.message });
    }
  }

  async updateOrder(req, res) {}

  async deleteOrder(req, res) {}
}

export default new OrdersController();
