import JWT from "jsonwebtoken";
import userModel from "../models/userModel.js";

export const requireSignIn = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).send({
        success: false,
        message: "Authentication required",
      });
    }

    const token = authHeader.split(" ")[1];

    // Verify token and decode user ID
    const decoded = JWT.verify(token, process.env.JWT_SECRET);

    // Add user info to request object
    req.user = decoded;

    // You can also log it to verify:
    console.log("User ID from token:", decoded._id);

    next();
  } catch (error) {
    console.error("JWT Verification Error:", error);
    return res.status(401).send({
      success: false,
      message: "Authentication failed",
      error: error.message,
    });
  }
};

//admin access
export const isAdmin = async (req, res, next) => {
  try {
    const user = await userModel.findById(req.user._id);
    if (user.role !== 1) {
      return res.status(401).send({
        success: false,
        message: "Unauthorized Access",
      });
    } else {
      next();
    }
  } catch (error) {
    console.log(error);
    res.status(401).send({
      success: false,
      error,
      message: "Error in admin middleware",
    });
  }
};
