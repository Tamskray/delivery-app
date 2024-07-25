import Router from "express";
import ProductsController from "../controllers/ProductsController.js";
import { check } from "express-validator";
import { uploadMiddleware } from "../middleware/upload-middeware.js";

const router = new Router();

router.get("/", ProductsController.getProducts);

router.get("/:productId", ProductsController.getProductById);

router.get("/shop/:shopUrl", ProductsController.getProductsByShopUrl);
router.get("/shop/types/:shopUrl", ProductsController.getProductTypesByShopUrl);

router.post(
  "/",
  uploadMiddleware.single("image"),
  [
    check("title", "Product name at least 4 characters").isLength({ min: 4 }),
    check(
      "description",
      "The description of the product is not entered"
    ).notEmpty(),
    check("type", "The name of the product type is not entered").notEmpty(),
    check("price", "Price is not specified").isNumeric().notEmpty(),
  ],
  ProductsController.createProduct
);

router.patch(
  "/:productId",
  uploadMiddleware.single("image"),
  [
    check("title", "Product name at least 4 characters").isLength({ min: 4 }),
    check(
      "description",
      "The description of the product is not entered"
    ).notEmpty(),
    check("type", "The name of the product type is not entered").notEmpty(),
    check("price", "Price is not specified").isNumeric().notEmpty(),
  ],
  ProductsController.updateProduct
);

router.delete("/:productId", ProductsController.deleteProduct);

export default router;
