import express from "express";
import { isAdmin, requireSignIn } from "../middlewares/authMiddlware.js";

import { createOrderController } from "../controllers/orderController.js";

const router = express.Router();
router.post("/create", requireSignIn, (req, res) => {
  console.log("Authorization Header:", req.headers.authorization);
  createOrderController(req, res);
});

export default router;
