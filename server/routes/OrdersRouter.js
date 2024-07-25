import Router from "express";
import OrdersController from "../controllers/OrdersController.js";
import { check } from "express-validator";
import { authMiddleware } from "../middleware/auth-middleware.js";

const router = new Router();

router.get("/", OrdersController.getOrders);

router.get("/current-order", OrdersController.getOrderByEmailAndPhone);

router.get("/:orderId", OrdersController.getOrderById);

router.post(
  "/",
  [
    check("name", "Name is not specified").notEmpty(),
    check("email", "Invalid email").notEmpty().normalizeEmail().isEmail(),
    check("phone", "Phone is not specified").isNumeric().notEmpty(),
    check("address", "Address is not specified").notEmpty(),
    check("items.*.title", "Order product title is not specified").notEmpty(),
    check("items.*.quantity", "Order product quantity is not specified")
      .isNumeric()
      .notEmpty(),
    check("items.*.price", "Order product price is not specified")
      .isNumeric()
      .notEmpty(),
    check("totalPrice", "Total price is not specified").isNumeric().notEmpty(),
  ],
  OrdersController.createOrder,
);

router.put("/:orderId", OrdersController.updateOrderStatus);

router.delete("/:orderId", authMiddleware, OrdersController.deleteOrder);

export default router;
