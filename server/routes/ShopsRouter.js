import Router from "express";
import ShopsController from "../controllers/ShopsController.js";
import { check } from "express-validator";

const router = new Router();

router.get("/", ShopsController.getShops);

router.get("/:shopId", ShopsController.getShopById);

router.post(
  "/",
  [
    check("title", "Shop name at least 4 characters").isLength({ min: 4 }),
    check("type", "The name of the shope type is not entered").notEmpty(),
  ],
  ShopsController.createShop
);

router.patch(
  "/:shopId",
  [
    check("title", "Shop name at least 4 characters").isLength({ min: 4 }),
    check("type", "The name of the shope type is not entered").notEmpty(),
  ],
  ShopsController.updateShop
);

router.delete("/:shopId", ShopsController.deleteShop);

export default router;
