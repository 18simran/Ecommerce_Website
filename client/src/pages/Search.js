import React from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout/Layout";
import { useSearch } from "../context/search";
import { useCart } from "../context/cart";
import toast from "react-hot-toast";

const Search = () => {
  const navigate = useNavigate();
  const [values, setValues] = useSearch();
  const [cart, setCart] = useCart();
  return (
    <Layout title={"Search results"}>
      <div className="container">
        <div className="text-center">
          <h1 style={{ color: " #036080" }}>Search Results</h1>
          <h6>
            {values?.results.length < 1
              ? "No product found"
              : `Found ${values?.results.length}`}
          </h6>
          <div className="d-flex flex-wrap mt-4">
            {values?.results.map((p) => (
              <div
                className="card m-2"
                style={{
                  width: "18rem",
                  borderRadius: "10px",
                  overflow: "hidden",
                  cursor: "pointer",
                }}
              >
                <img
                  src={`/api/v1/product/product-photo/${p._id}`}
                  className="card-img-top"
                  alt={p.name}
                  style={{
                    "border-radius-top-left": "10px",
                    "border-radius-top-right": "10px",
                    height: "350px",
                  }}
                />
                <div className="card-body">
                  <p
                    className="card-title"
                    style={{ fontWeight: "500", color: "#013c50" }}
                  >
                    {p.name.substring(0, 18)}...
                  </p>
                  <p
                    className="card-text"
                    style={{
                      fontSize: "16px",
                      marginBottom: 0,
                    }}
                  >
                    {p.description.substring(0, 30)}...
                  </p>
                  <p
                    className="card-text"
                    style={{ fontWeight: "500", color: "green" }}
                  >
                    $ {p.price}
                  </p>
                  <button
                    class="btn btn-primary ms-1"
                    onClick={() => navigate(`/product/${p.slug}`)}
                    style={{ marginRight: "12px" }}
                  >
                    More Details
                  </button>
                  <button
                    class="btn btn-secondary ms-1"
                    onClick={(e) => {
                      e.stopPropagation();
                      if (!cart.find((item) => item._id === p._id)) {
                        const updatedCart = [...cart, p];
                        setCart(updatedCart);
                        localStorage.setItem(
                          "cart",
                          JSON.stringify(updatedCart)
                        );
                        toast.success("Item Added to cart");
                      } else {
                        toast("Item already in cart");
                      }
                    }}
                  >
                    Add To Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Search;
