import Router from "express";
import UserController from "../controllers/UserController.js";
import { authMiddleware } from "../middleware/auth-middleware.js";

const router = new Router();

router.get("/", authMiddleware, UserController.getUsers);

router.post("/", UserController.createUser);

router.post("/login", UserController.login);

export default router;
