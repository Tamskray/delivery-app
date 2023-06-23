import Router from "express";
import ProductsController from "../controllers/ProductsController.js";
import { check } from "express-validator";

const router = new Router();

router.get("/", ProductsController.getProducts);

router.get("/:productId", ProductsController.getProductById);

router.get("/shop/:shopUrl", ProductsController.getProductsByShopUrl);
router.get("/shop/types/:shopUrl", ProductsController.getProductTypesByShopUrl);

router.post(
  "/",
  [
    check("title", "Product name at least 4 characters").isLength({ min: 4 }),
    check("type", "The name of the product type is not entered").notEmpty(),
    check("price", "Price is not specified").isNumeric().notEmpty(),
  ],
  ProductsController.createProduct
);

router.patch(
  "/:productId",
  [
    check("title", "Product name at least 4 characters").isLength({ min: 4 }),
    check("type", "The name of the product type is not entered").notEmpty(),
    check("price", "Price is not specified").isNumeric().notEmpty(),
  ],
  ProductsController.updateProduct
);

router.delete("/:productId", ProductsController.deleteProduct);

export default router;
