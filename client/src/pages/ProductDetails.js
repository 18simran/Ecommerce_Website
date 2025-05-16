import Layout from "./../components/Layout/Layout";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import "../styles/ProductDetailsStyles.css";
import "../styles/ratings.css";
import { useCart } from "../context/cart";
import toast from "react-hot-toast";
import { useAuth } from "../context/auth";
import { useState, useEffect } from "react";

const ProductDetails = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState({});
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState({ rating: "1", comment: "" });

  const [cart, setCart] = useCart();
  const [isLiked, setIsLiked] = useState(false);
  const [auth] = useAuth();

  console.log("Auth:", auth);
  useEffect(() => {
    if (params?.slug) getProduct();
  }, [params?.slug]);

  const getProduct = async () => {
    try {
      const { data } = await axios.get(
        `/api/v1/product/get-product/${params.slug}`
      );
      setProduct(data?.product);
      setIsLiked(
        Array.isArray(data?.product?.likes) && data.product.likes.length > 0
      );
      getSimilarProduct(data?.product._id, data?.product.category._id);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (product._id) {
      fetchReviews(product._id);
    }
  }, [product._id]);

  const fetchReviews = async (productId) => {
    try {
      const { data } = await axios.get(`/api/v1/review/product/${productId}`);
      if (data.success) {
        setReviews(data.reviews);
      }
    } catch (error) {
      console.error("Error fetching reviews:", error);
    }
  };

  const getSimilarProduct = async (pid, cid) => {
    try {
      const { data } = await axios.get(
        `/api/v1/product/related-product/${pid}/${cid}`
      );
      setRelatedProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };

  const handleLikes = async () => {
    try {
      if (!auth?.token) {
        toast.error("Please login to like products");
        navigate("/login");
        return;
      }

      const { data } = await axios.put(
        `/api/v1/product/toggle-like/${product._id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        }
      );

      setIsLiked(!isLiked);
      toast.success(data.message);
    } catch (error) {
      console.log(error);
      toast.error("Error toggling like");
    }
  };

  return (
    <Layout>
      <div className="row container product-details offset-1">
        <h1 className="text-center">Product Details</h1>
        <hr />
        <div className="col-md-5">
          <img
            src={`/api/v1/product/product-photo/${product._id}`}
            className="card-img-top"
            alt={product.name}
            width="200px"
            height="600px"
          />
        </div>
        <div className="col-md-5 product-details-info">
          <div className="product-details-content">
            <p
              className="like-button"
              title="Add to Wishlist"
              onClick={handleLikes}
            >
              {isLiked ? "❤️" : "🤍"}
            </p>
            <p>
              <span>Name :</span> {product.name}
            </p>
            <p>
              <span>Description :</span> {product.description}
            </p>
            <p>
              <span>Price :</span>{" "}
              {product?.price?.toLocaleString("en-US", {
                style: "currency",
                currency: "USD",
              })}
            </p>
            <p>
              <span>Category :</span> {product?.category?.name}
            </p>
          </div>

          <button
            className="btn product-detail-btn"
            onClick={(e) => {
              e.stopPropagation();
              if (!cart.find((item) => item._id === product._id)) {
                const updatedCart = [...cart, product];
                setCart(updatedCart);
                localStorage.setItem("cart", JSON.stringify(updatedCart));
                toast.success("Item Added to cart");
              } else {
                toast("Item already in cart");
              }
            }}
          >
            ADD TO CART
          </button>
        </div>
      </div>

      <hr />
      <div className="reviews row container offset-1">
        <h2>Customer Reviews 📝 </h2>
        {reviews.map((rev) => (
          <div key={rev._id} className="review-box col-md-3 mt-4">
            <p>
              <strong>@ {rev.user?.name}</strong>
            </p>
            <p>{rev.comment}</p>
            <p>⭐ {rev.rating}/5</p>

            {auth?.user?._id === rev?.user?._id && (
              <button
                className="btn btn-sm review-btn"
                onClick={async () => {
                  try {
                    await axios.delete(`/api/v1/review/${rev._id}`, {
                      headers: {
                        Authorization: `Bearer ${auth.token}`,
                      },
                    });
                    setReviews(reviews.filter((r) => r._id !== rev._id));
                    toast.success("Review deleted");
                  } catch (error) {
                    toast.error("Failed to delete review");
                  }
                }}
              >
                Delete
              </button>
            )}
          </div>
        ))}

        {auth?.user ? (
          <div style={{ marginTop: "50px" }}>
            <h2>Add a review ✍️</h2>
            <form
              className="review-form col-md-8 offset-2"
              onSubmit={async (e) => {
                e.preventDefault();
                try {
                  const { data } = await axios.post(
                    `/api/v1/review/create`,
                    { ...newReview, productId: product._id },
                    {
                      headers: {
                        Authorization: `Bearer ${auth.token}`,
                      },
                    }
                  );
                  toast.success("Review submitted!");
                  setReviews([...reviews, data.review]);
                  setNewReview({ rating: "1", comment: "" });
                } catch (err) {
                  toast.error("Failed to submit review");
                }
              }}
            >
              <fieldset className="starability-slot">
                <input
                  type="radio"
                  id="first-rate1"
                  name="review[rating]"
                  value="1"
                  checked={newReview.rating === "1"}
                  onChange={(e) =>
                    setNewReview({ ...newReview, rating: e.target.value })
                  }
                />
                <label htmlFor="first-rate1" title="Terrible">
                  1 star
                </label>

                <input
                  type="radio"
                  id="first-rate2"
                  name="review[rating]"
                  value="2"
                  checked={newReview.rating === "2"}
                  onChange={(e) =>
                    setNewReview({ ...newReview, rating: e.target.value })
                  }
                />
                <label htmlFor="first-rate2" title="Not good">
                  2 stars
                </label>

                <input
                  type="radio"
                  id="first-rate3"
                  name="review[rating]"
                  value="3"
                  checked={newReview.rating === "3"}
                  onChange={(e) =>
                    setNewReview({ ...newReview, rating: e.target.value })
                  }
                />
                <label htmlFor="first-rate3" title="Average">
                  3 stars
                </label>

                <input
                  type="radio"
                  id="first-rate4"
                  name="review[rating]"
                  value="4"
                  checked={newReview.rating === "4"}
                  onChange={(e) =>
                    setNewReview({ ...newReview, rating: e.target.value })
                  }
                />
                <label htmlFor="first-rate4" title="Very good">
                  4 stars
                </label>

                <input
                  type="radio"
                  id="first-rate5"
                  name="review[rating]"
                  value="5"
                  checked={newReview.rating === "5"}
                  onChange={(e) =>
                    setNewReview({ ...newReview, rating: e.target.value })
                  }
                />
                <label htmlFor="first-rate5" title="Amazing">
                  5 stars
                </label>
              </fieldset>

              <div className="mb-4">
                <label>Comment:</label>
                <textarea
                  required
                  value={newReview.comment}
                  cols={20}
                  rows={5}
                  onChange={(e) =>
                    setNewReview({ ...newReview, comment: e.target.value })
                  }
                  className="form-control"
                />
              </div>

              <button className="btn review-btn mt-2">Submit Review</button>
            </form>
          </div>
        ) : (
          <p className="login-msg">
            Please <a href="/login">Login</a> to write a review.
          </p>
        )}
      </div>

      <hr />
      <div className="similar-products row container similar-products offset-1">
        <h2>Similar Products ➡️</h2>
        {relatedProducts.length < 1 && (
          <p className="text-center">No Similar Products found</p>
        )}
        <div className="d-flex flex-wrap">
          {relatedProducts?.map((p) => (
            <div className="card similar-product-card" key={p._id}>
              <img
                src={`/api/v1/product/product-photo/${p._id}`}
                className="card-img-top"
                alt={p.name}
                onClick={() => {
                  navigate(`/product/${p.slug}`);
                  window.scrollTo(0, 0);
                }}
              />

              <div
                className="card-body"
                onClick={() => {
                  navigate(`/product/${p.slug}`);
                  window.scrollTo(0, 0);
                }}
              >
                <div className="card-name-price">
                  <p className="card-title">{p.name.substring(0, 15)}...</p>
                  <p className="card-title card-price">
                    {p.price.toLocaleString("en-US", {
                      style: "currency",
                      currency: "USD",
                    })}
                  </p>
                </div>
                <p className="card-text ">
                  {p.description.substring(0, 40)}...
                </p>
                <div className="card-name-price">
                  <button
                    className="btn btn-dark ms-1"
                    onClick={(e) => {
                      e.stopPropagation();
                      setCart([...cart, p]);
                      localStorage.setItem(
                        "cart",
                        JSON.stringify([...cart, p])
                      );
                      toast.success("Item Added to cart");
                    }}
                  >
                    ADD TO CART
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetails;
