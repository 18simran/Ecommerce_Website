import reviewModel from "../models/review.js";

export const createReviewController = async (req, res) => {
  try {
    const { productId, rating, comment } = req.body;

    const review = new reviewModel({
      product: productId,
      user: req.user._id,
      rating,
      comment: comment.trim(),
    });

    await review.save();
    await review.populate("user");
    res.status(201).json({ message: "Review added", review });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error adding review" });
  }
};

export const getProductReviewsController = async (req, res) => {
  try {
    const { productId } = req.params;
    console.log("Fetching reviews for productId:", productId);

    const reviews = await reviewModel
      .find({
        product: req.params.productId,
      })
      .populate("user", "name _id");

    res.status(200).send({ success: true, reviews });
  } catch (error) {
    console.log("Review fetch error:", error);
    res
      .status(500)
      .send({ success: false, message: "Error fetching reviews", error });
  }
};

export const deleteReviewController = async (req, res) => {
  try {
    const review = await reviewModel.findById(req.params.id);

    if (!review) {
      return res
        .status(404)
        .send({ success: false, message: "Review not found" });
    }
    console.log(review + "😂😂");
    if (review.user.toString() !== req.user._id.toString()) {
      return res.status(403).send({ success: false, message: "Unauthorized" });
    }

    await reviewModel.findByIdAndDelete(req.params.id);
    res
      .status(200)
      .send({ success: true, message: "Review deleted successfully" });
  } catch (error) {
    console.error("Delete review error:", error);
    res.status(500).send({ success: false, message: "Error deleting review" });
  }
};
