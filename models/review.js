import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    product: { type: mongoose.Schema.Types.ObjectId, ref: "Products" },

    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },

    rating: {
      type: Number,
      min: 1,
      max: 5,
    },

    comment: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.model("Review", reviewSchema);
