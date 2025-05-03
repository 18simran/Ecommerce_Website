import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../context/auth";
import { useNavigate } from "react-router-dom";
import "../../styles/Wishlist.css";
const Wishlist = () => {
  const [auth] = useAuth();
  const [likedProducts, setLikedProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getLikedProducts = async () => {
      try {
        const { data } = await axios.get(
          "/api/v1/product/user-liked-products",
          {
            headers: {
              Authorization: `Bearer ${auth?.token}`,
            },
          }
        );
        setLikedProducts(data.products);
      } catch (error) {
        console.log(error);
      }
    };
    if (auth?.token) {
      getLikedProducts();
    }
  }, [auth?.token]);

  return (
    <div className="container wishlist-container">
      <h1>Your Wishlist</h1>
      {likedProducts.length === 0 ? (
        <p className="wishlist-message">No products liked yet.</p>
      ) : (
        <div className="row">
          {likedProducts.map((p) => (
            <div
              key={p._id}
              className="col-md-3 card wishlist-card"
              onClick={() => navigate(`/product/${p.slug}`)}
            >
              <img
                src={`/api/v1/product/product-photo/${p._id}`}
                className="card-img-top"
                alt={p.name}
              />
              <div className="card-body">
                <h5 className="card-title">{p.name}</h5>
                <p className="card-text">{p.description}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist;
