import express from "express";
import { isAdmin, requireSignIn } from "../middlewares/authMiddlware.js";
import {
  brainTreePaymentController,
  braintreeTokenController,
  createProductController,
  deleteProductContoller,
  getProductController,
  getSingleProductController,
  productCategoryController,
  productCountController,
  productFilterController,
  productListController,
  productPhotoController,
  relatedProductController,
  searchProductController,
  updateProductController,
  toggleLikeProductController,
  getUserLikedProductsController,
} from "../controllers/productController.js";
import formidable from "express-formidable";

//import productModel from "../models/productModel.js";

const router = express.Router();

//router

//create products
router.post(
  "/create-product",
  requireSignIn,
  isAdmin,
  formidable(),
  createProductController
);

//update product
router.put(
  "/update-product/:pid",
  requireSignIn,
  isAdmin,
  formidable(),
  updateProductController
);

//get products
router.get("/get-product", getProductController);

//get single products
router.get("/get-product/:slug", getSingleProductController);

//get photo
router.get("/product-photo/:pid", productPhotoController);

//delete product
router.delete("/delete-product/:pid", deleteProductContoller);

//filter product
router.post("/product-filters", productFilterController);

//product count
router.get("/product-count", productCountController);

//product per page
router.get("/product-list/:page", productListController);

//search product
router.get("/search/:keyword", searchProductController);

//similar product
router.get("/related-product/:pid/:cid", relatedProductController);

//category wise product
router.get("/product-category/:slug", productCategoryController);

//payments routes
//token
router.get("/braintree/token", braintreeTokenController);

//payment
router.post("/braintree/payment", requireSignIn, brainTreePaymentController);

router.put(
  "/toggle-like/:productId",
  requireSignIn,
  toggleLikeProductController
);

router.get(
  "/user-liked-products",
  requireSignIn,
  getUserLikedProductsController
);

export default router;
