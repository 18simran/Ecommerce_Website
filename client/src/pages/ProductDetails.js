import React, { useState, useEffect } from "react";
import Layout from "./../components/Layout/Layout";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import "../styles/ProductDetailsStyles.css";
import { useCart } from "../context/cart";
import toast from "react-hot-toast";
import { useAuth } from "../context/auth";

const ProductDetails = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState({});
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [cart, setCart] = useCart();
  const [isLiked, setIsLiked] = useState(false);
  const [auth] = useAuth();

  //initalp details
  useEffect(() => {
    if (params?.slug) getProduct();
  }, [params?.slug]);
  //getProduct
  const getProduct = async () => {
    try {
      const { data } = await axios.get(
        `/api/v1/product/get-product/${params.slug}`
      );
      setProduct(data?.product);
      setIsLiked(data.product.likes && data.product.likes.length > 0);

      getSimilarProduct(data?.product._id, data?.product.category._id);
    } catch (error) {
      console.log(error);
    }
  };
  //get similar product
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
  // handle likes
  // const handleLikes = async () => {
  //   try {
  //     const authString = localStorage.getItem("auth");
  //     if (!authString) {
  //       toast.error("Please login to like products");
  //       navigate("/login");
  //       return;
  //     }

  //     const auth = JSON.parse(authString);
  //     const token = auth.token;

  //     if (!token) {
  //       toast.error("Authentication issue. Please login again");
  //       navigate("/login");
  //       return;
  //     }

  //     const { data } = await axios.put(
  //       `/api/v1/product/toggle-like/${product._id}`,
  //       {},
  //       {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       }
  //     );

  //     setIsLiked(!isLiked);
  //     toast.success(data.message);
  //   } catch (error) {
  //     console.log(error);
  //     toast.error("Error toggling like");
  //   }
  // };
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
              {isLiked ? "❤️" : "🤍"}{" "}
            </p>
            <p>
              <span>Name : </span> {product.name}
            </p>
            <p>
              <span>Description : </span> {product.description}
            </p>
            <p>
              <span>Price : </span>
              {product?.price?.toLocaleString("en-US", {
                style: "currency",
                currency: "USD",
              })}
            </p>
            <p>
              <span>Category : </span> {product?.category?.name}
            </p>
          </div>
          <button
            className="btn product-detail-btn "
            onClick={(e) => {
              e.stopPropagation();
              setCart([...cart, product]);
              localStorage.setItem("cart", JSON.stringify([...cart, product]));
              toast.success("Item Added to cart");
            }}
          >
            ADD TO CART
          </button>
        </div>
      </div>
      <hr />
      <div className="row container similar-products offset-1">
        <h4>Similar Products ➡️</h4>
        {relatedProducts.length < 1 && (
          <p className="text-center">No Similar Products found</p>
        )}
        <div className="d-flex flex-wrap">
          {relatedProducts?.map((p) => (
            <div className="card m-4" key={p._id}>
              <img
                src={`/api/v1/product/product-photo/${p._id}`}
                className="card-img-top"
                alt={p.name}
              />
              <div
                className="card-body"
                onClick={() => navigate(`/product/${p.slug}`)}
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
