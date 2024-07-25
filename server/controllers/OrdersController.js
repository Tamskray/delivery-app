import Order from "../models/Order.js";
import { validationResult } from "express-validator";

class OrdersController {
  async getOrders(req, res) {
    try {
      const orders = await Order.find().sort({ status: 1 });
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

  async getOrderByEmailAndPhone(req, res) {
    try {
      const { email, phone } = req.query;
      const orders = await Order.find({
        status: "В процесі",
        phone,
        email,
      });

      res.status(200).json(orders);
    } catch (err) {
      res.status(500).json({ message: err.message });
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

      const { name, email, phone, address, items, totalPrice } = req.body;

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
        status: "В процесі",
        // shop,
      });

      await newOrder.save();

      res.status(201).json(newOrder);
    } catch (err) {
      res.status(409).json({ message: err.message });
    }
  }

  async updateOrderStatus(req, res) {
    try {
      const { orderId } = req.params;
      const { status } = req.body;

      const order = await Order.findById(orderId);

      if (!order) {
        return res
          .status(404)
          .json({ message: "Could not find an order by provided id" });
      }

      order.status = status;

      await order.save();
    } catch (err) {
      return res.status(500).json({ message: err });
    }
  }

  async deleteOrder(req, res) {
    try {
      const orderId = req.params.orderId;

      const order = await Order.findById(orderId);

      if (!order) {
        return res.status(404).json({
          message: "Something went wrong, could not find an orden",
        });
      }

      await Order.findByIdAndDelete(orderId);

      res.status(200).json({ message: "Order deleted successfully" });
    } catch (err) {
      res.status(404).json({ message: err.message });
    }
  }
}

export default new OrdersController();
