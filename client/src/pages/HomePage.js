import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Checkbox, Radio } from "antd";
import { Prices } from "../components/Prices";
import { useCart } from "../context/cart";
import toast from "react-hot-toast";
import axios from "axios";
import Layout from "./../components/Layout/Layout";
import { AiOutlineReload } from "react-icons/ai";
import { Link } from "react-router-dom";
import "../styles/Homepage.css";

const HomePage = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useCart();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const getAllCategory = async () => {
    try {
      const { data } = await axios.get("/api/v1/category/get-category");
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllCategory();
    getTotal();
  }, []);

  const getAllProducts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/api/v1/product/product-list/${page}`);
      setLoading(false);
      setProducts(data.products);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  //getTOtal COunt
  const getTotal = async () => {
    try {
      const { data } = await axios.get("/api/v1/product/product-count");
      setTotal(data?.total);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (page === 1) return;
    loadMore();
  }, [page]);

  //load more
  const loadMore = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/api/v1/product/product-list/${page}`);
      setLoading(false);
      setProducts([...products, ...data?.products]);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  // filter by cat
  const handleFilter = (value, id) => {
    let all = [...checked];
    if (value) {
      all.push(id);
    } else {
      all = all.filter((c) => c !== id);
    }
    setChecked(all);
  };

  useEffect(() => {
    if (!checked.length || !radio.length) getAllProducts();
  }, [checked.length, radio.length]);

  useEffect(() => {
    if (checked.length || radio.length) filterProduct();
  }, [checked, radio]);

  //get filterd product
  const filterProduct = async () => {
    try {
      const { data } = await axios.post("/api/v1/product/product-filters", {
        checked,
        radio,
      });
      setProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout title={"All Products - Best offers "}>
      <img
        src="../images/Homepage.png"
        className="banner-img"
        alt="bannerimage"
        width={"100%"}
        onClick={(e) => {
          e.preventDefault();
          navigate("/category/fashion");
        }}
      />

      <div className="container text-center category-layout">
        <h2 className=" mb-2">Best For Your Categories</h2>
        <p className="text-muted mb-5">
          Find your perfect match – fashion, gadgets, and more all in one place.
        </p>

        <div className="row justify-content-center">
          <Link
            to="/category/electronics"
            className="text-decoration-none text-dark col-6 col-sm-4 col-md-2 "
          >
            <div className="category-item">
              <img
                src="../images/Electronics-7.jpg"
                alt="Watch"
                className="category-img"
              />
              <p className="mt-2 fw-medium">Electronics</p>
              <small className="text-muted">17 Products</small>
            </div>
          </Link>
          <Link
            to="/category/fashion"
            className="text-decoration-none text-dark col-6 col-sm-4 col-md-2"
          >
            <div className=" category-item">
              <img
                src="../images/FImage-6.jpg"
                alt="Fashionista"
                className="category-img"
              />
              <p className="mt-2 fw-medium">Fashionista</p>
              <small className="text-muted">6 Products</small>
            </div>
          </Link>

          <Link
            to="/category/ethnic"
            className="text-decoration-none text-dark col-6 col-sm-4 col-md-2"
          >
            <div className=" category-item">
              <img
                src="../images/Ethnic-2.jpg"
                alt="Ethnic Wear"
                className="category-img"
              />
              <p className="mt-2 fw-medium">Ethnic Wear</p>
              <small className="text-muted">4 Products</small>
            </div>
          </Link>

          <Link
            to="/category/goggles"
            className="text-decoration-none text-dark col-6 col-sm-4 col-md-2"
          >
            <div className=" category-item">
              <img
                src="../images/Goggles-1.jpg"
                alt="Goggles"
                className="category-img"
              />
              <p className="mt-2 fw-medium">Goggles</p>
              <small className="text-muted">10 Products</small>
            </div>
          </Link>

          <Link
            to="/category/bag"
            className="text-decoration-none text-dark col-6 col-sm-4 col-md-2"
          >
            <div className=" category-item">
              <img
                src="../images/bag-1.jpg"
                alt="Tote Bag"
                className="category-img"
              />
              <p className="mt-2 fw-medium">Tote Bag</p>
              <small className="text-muted">4 Products</small>
            </div>
          </Link>

          <Link
            to="/category/shoes"
            className="text-decoration-none text-dark col-6 col-sm-4 col-md-2"
          >
            <div className=" category-item">
              <img
                src="../images/shoes-1.jpg"
                alt="Shoes"
                className="category-img"
              />
              <p className="mt-2 fw-medium">Shoes</p>
              <small className="text-muted">5 Products</small>
            </div>
          </Link>
        </div>
      </div>

      <div className="container-fluid row mt-3 home-page">
        <div className="col-md-3 filters">
          <h4 className="">Filter By Category</h4>
          <div className="d-flex flex-column">
            {categories?.map((c) => (
              <Checkbox
                key={c._id}
                onChange={(e) => handleFilter(e.target.checked, c._id)}
              >
                {c.name}
              </Checkbox>
            ))}
          </div>

          <h4 className=" mt-4">Filter By Price</h4>
          <div className="d-flex flex-column">
            <Radio.Group onChange={(e) => setRadio(e.target.value)}>
              {Prices?.map((p) => (
                <div key={p._id}>
                  <Radio value={p.array}>{p.name}</Radio>
                </div>
              ))}
            </Radio.Group>
          </div>
          <div className="d-flex flex-column">
            <button className="btn " onClick={() => window.location.reload()}>
              RESET FILTERS
            </button>
          </div>
        </div>
        <div className="col-md-9 mt-3 ">
          <h1 className="text-center">All Products</h1>
          <div className="d-flex flex-wrap">
            {products?.map((p, index) => (
              <div className="col-md-4" key={p._id}>
                <div className="card m-2">
                  <img
                    src={`/api/v1/product/product-photo/${p._id}`}
                    className="card-img-top"
                    alt={p.name}
                    style={{ cursor: "pointer" }}
                    onClick={() => navigate(`/product/${p.slug}`)}
                  />
                  <div
                    className="card-body"
                    onClick={() => navigate(`/product/${p.slug}`)}
                  >
                    <div className="card-name-price">
                      <p className="card-title">{p.name.substring(0, 18)}...</p>
                      <p className=" card-price">
                        {p.price.toLocaleString("en-US", {
                          style: "currency",
                          currency: "USD",
                        })}
                      </p>
                    </div>
                    <p className="card-text ">
                      {p.description.substring(0, 47)}...
                    </p>
                    <div className="card-name-price">
                      <button
                        className="btn btn-dark ms-1 card-btn"
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
                        ADD TO CART
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="m-2 p-3 text-center">
            {products && products.length < total && (
              <button
                className="btn loadmore text-center"
                onClick={(e) => {
                  e.preventDefault();
                  setPage(page + 1);
                }}
              >
                {loading ? (
                  "Loading ..."
                ) : (
                  <>
                    {" "}
                    Loadmore <AiOutlineReload />
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;
