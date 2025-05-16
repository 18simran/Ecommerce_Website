import productModel from "../models/productModel.js";
import categoryModel from "../models/categoryModel.js";
import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";

import fs from "fs";
import slugify from "slugify";
import braintree from "braintree";
import dotenv from "dotenv";

dotenv.config();

//payment gateway

const gateway = new braintree.BraintreeGateway({
  environment: braintree.Environment.Sandbox,
  merchantId: process.env.BRAINTREE_MERCHANT_ID,
  publicKey: process.env.BRAINTREE_PUBLIC_KEY,
  privateKey: process.env.BRAINTREE_PRIVATE_KEY,
});

export const createProductController = async (req, res) => {
  try {
    const { name, description, price, category, quantity, shipping } =
      req.fields;
    const { photo } = req.files;

    const errors = [];

    if (!name) errors.push("Name is required");
    if (!description) errors.push("Description is required");
    if (!price) errors.push("Price is required");
    if (!category) errors.push("Category is required");
    if (!quantity) errors.push("Quantity is required");
    if (photo && photo.size > 1000000)
      errors.push("Photo must be less than 1MB");

    if (errors.length) {
      return res.status(400).send({ errors });
    }

    const newProduct = new productModel({
      ...req.fields,
      slug: slugify(name),
    });

    if (photo) {
      const photoData = await fs.promises.readFile(photo.path); // Async file read
      newProduct.photo.data = photoData;
      newProduct.photo.contentType = photo.type;
    }

    await newProduct.save();

    res.status(201).send({
      success: true,
      message: "Product created successfully",
      product: newProduct,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: "Error creating product",
      error,
    });
  }
};

export const getProductController = async (req, res) => {
  try {
    const products = await productModel
      .find({})
      .populate("category")
      .select("-photo")
      .limit(12)
      .sort({ createdAt: -1 });
    res.status(200).send({
      success: true,
      countTotal: products.length,
      message: "AllProducts",
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in products",
      error,
    });
  }
};

//get single products
export const getSingleProductController = async (req, res) => {
  try {
    const product = await productModel
      .findOne({ slug: req.params.slug })
      .select("-photo")
      .populate("category");
    res.status(200).send({
      success: true,
      message: "Single product fetched",
      product,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in single product",
      error,
    });
  }
};

//get photo controller
export const productPhotoController = async (req, res) => {
  try {
    const product = await productModel.findById(req.params.pid).select("photo");
    if (product.photo.data) {
      res.set("Content-type", product.photo.contentType);
      return res.status(200).send(product.photo.data);
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while getting photo",
      error,
    });
  }
};

//delete product
export const deleteProductContoller = async (req, res) => {
  try {
    await productModel.findByIdAndDelete(req.params.pid).select("photo");
    res.status(200).send({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error during delete product",
      error,
    });
  }
};

//update product
export const updateProductController = async (req, res) => {
  try {
    const { name, slug, description, price, category, quantity, shipping } =
      req.fields;
    const { photo } = req.files;

    //validation
    switch (true) {
      case !name:
        return res.status(500).send({
          error: "Name is required",
        });
      case !description:
        return res.status(500).send({
          error: "Description is required",
        });
      case !price:
        return res.status(500).send({
          error: "Price is required",
        });
      case !category:
        return res.status(500).send({
          error: "Category is required",
        });
      case !quantity:
        return res.status(500).send({
          error: "Quantity is required",
        });
      case photo && photo.size > 1000000:
        return res.status(500).send({
          error: "Photo is required and should be less then 1mb",
        });
    }
    const products = await productModel.findByIdAndUpdate(
      req.params.pid,
      { ...req.fields, slug: slugify(name) },
      { new: true }
    );
    if (photo) {
      products.photo.data = fs.readFileSync(photo.path);
      products.photo.contentType = photo.type;
    }
    await products.save();
    res.status(201).send({
      success: true,
      messsage: "Product updated successfully",
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      messsage: "Error in update product",
    });
  }
};

//filters
export const productFilterController = async (req, res) => {
  try {
    const { checked, radio } = req.body;
    let args = {};
    if (checked.length > 0) args.category = checked;
    if (radio.length) args.price = { $gte: radio[0], $lte: radio[1] };
    const products = await productModel.find(args);
    res.status(200).send({
      success: true,
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Error while fiultering products",
      error,
    });
  }
};

//products count
export const productCountController = async (req, res) => {
  try {
    const total = await productModel.find({}).estimatedDocumentCount();
    res.status(200).send({
      success: true,
      total,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Error while counting products",
      error,
    });
  }
};

//product list base on page
export const productListController = async (req, res) => {
  try {
    const perPage = 2;
    const page = req.params.page ? req.params.page : 1;
    const products = await productModel
      .find({})
      .select("-photo")
      .skip((page - 1) * perPage)
      .limit(perPage)
      .sort({ createdAt: -1 });
    res.status(200).send({
      success: true,
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "error in per page ctrl",
      error,
    });
  }
};

//search product
export const searchProductController = async (req, res) => {
  try {
    const { keyword } = req.params;
    const results = await productModel
      .find({
        $or: [
          { name: { $regex: keyword, $options: "i" } },
          { description: { $regex: keyword, $options: "i" } },
        ],
      })
      .select("-photo");
    res.json(results);
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "error in search product api",
      error,
    });
  }
};

//similar products
export const relatedProductController = async (req, res) => {
  try {
    const { pid, cid } = req.params;
    const products = await productModel
      .find({
        category: cid,
        _id: { $ne: pid },
      })
      .select("-photo")
      .limit(3)
      .populate("category");

    res.status(200).send({
      success: true,
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Error while getting related products",
      error,
    });
  }
};

// get product by category
export const productCategoryController = async (req, res) => {
  try {
    const category = await categoryModel.findOne({ slug: req.params.slug });
    const products = await productModel.find({ category }).populate("category");
    res.status(200).send({
      success: true,
      category,
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      error,
      message: "Error While Getting products",
    });
  }
};

//payment gateway api
//token
export const braintreeTokenController = async (req, res) => {
  try {
    gateway.clientToken.generate({}, function (err, response) {
      if (err) {
        return res.status(500).send({ error: "Error generating client token" });
      } else {
        res.send(response);
      }
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: "Server error" });
  }
};


export const brainTreePaymentController = async (req, res) => {
  try {
    const { nonce, cart } = req.body; // nonce from Braintree frontend
    console.log("Received cart:", cart); // Log cart to verify structure

    // Process the payment with Braintree
    gateway.transaction.sale(
      {
        amount: cart.reduce((acc, item) => acc + item.price, 0).toString(), // Convert to string
        paymentMethodNonce: nonce,
        options: {
          submitForSettlement: true, // Automatically settle the transaction
        },
      },
      async (err, result) => {
        if (err || !result.success) {
          console.log(err);
          return res.status(500).send({ error: "Payment failed" });
        }

        // On successful payment, create an order in the database
        const order = await new orderModel({
          products: cart,
          payment: result,
          buyer: req.user._id,
        }).save();

        console.log("Order saved:", order);
        res.json({ success: true, message: "Order placed successfully!" });
      }
    );
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({ error: "Error processing payment and placing order" });
  }
};

// In productController.js

export const toggleLikeProductController = async (req, res) => {
  try {
    const { productId } = req.params;
    const userId = req.user._id;
    // Find product
    const product = await productModel.findById(productId);
    if (!product) {
      return res.status(404).send({
        success: false,
        message: "Product not found",
      });
    }
    const isLiked = product.likes.includes(userId);

    if (isLiked) {
      product.likes.pull(userId);
    } else {
      product.likes.push(userId);
    }

    await product.save();

    res.status(200).send({
      success: true,
      message: isLiked ? "Product unliked" : "Product liked",
      product,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: "Error toggling like status",
      error: error.message,
    });
  }
};

// controllers/productController.js
export const getUserLikedProductsController = async (req, res) => {
  try {
    const userId = req.user._id;
    const products = await productModel.find({ likes: userId });
    res.status(200).send({
      success: true,
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in getting liked products",
      error,
    });
  }
};
