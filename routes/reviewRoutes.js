import express from "express";
import {
  createReviewController,
  getProductReviewsController,
  deleteReviewController,
} from "../controllers/reviewController.js";
import { requireSignIn } from "../middlewares/authMiddlware.js";

const router = express.Router();

router.post("/create", requireSignIn, createReviewController);
router.get("/product/:productId", getProductReviewsController);
router.delete("/:id", requireSignIn, deleteReviewController);

export default router;
