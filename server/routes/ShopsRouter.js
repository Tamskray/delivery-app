import Router from "express";
import ShopsController from "../controllers/ShopsController.js";
import { check } from "express-validator";
import { uploadMiddleware } from "../middleware/upload-middeware.js";
import { authMiddleware } from "../middleware/auth-middleware.js";

const router = new Router();

// отримання данних про всі заклади
router.get("/", ShopsController.getShops);

router.get("/types", ShopsController.getShopsTypes);

// router.get("/:shopId", ShopsController.getShopById);
router.get("/:shopUrl", ShopsController.getShopByUrl);

router.post(
  "/",
  authMiddleware,
  uploadMiddleware.single("image"),
  [
    check("title", "Shop name at least 4 characters").isLength({ min: 4 }),
    check("url", "The url of the shope is not entered").notEmpty(),
    check("type", "The name of the shope type is not entered").notEmpty(),
    check("info", "Info is not entered").notEmpty(),
    check("deliveryMinCost", "Delivery minimal cost is not entered")
      .notEmpty()
      .isNumeric(),
    check("deliveryTime", "Delivery time cost is not entered")
      .notEmpty()
      .isNumeric(),
  ],
  ShopsController.createShop
);

router.patch(
  "/:shopId",
  authMiddleware,
  uploadMiddleware.single("image"),
  [
    check("title", "Shop name at least 4 characters").isLength({ min: 4 }),
    check("url", "The url of the shope is not entered").notEmpty(),
    check("type", "The name of the shope type is not entered").notEmpty(),
    check("info", "Info is not entered").notEmpty(),
    check("deliveryMinCost", "Delivery minimal cost is not entered")
      .notEmpty()
      .isNumeric(),
    check("deliveryTime", "Delivery time cost is not entered")
      .notEmpty()
      .isNumeric(),
  ],
  ShopsController.updateShop
);

router.delete("/:shopId", authMiddleware, ShopsController.deleteShop);

export default router;
