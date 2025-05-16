import { useAuth } from "../../context/auth";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faInstagram,
  faXTwitter,
  faYoutube,
  faPinterest,
  faTiktok,
} from "@fortawesome/free-brands-svg-icons";
import "../../styles/Footer.css";
import toast from "react-hot-toast";
import React, { useState } from "react";

const Footer = () => {
  const [auth] = useAuth();
  const navigate = useNavigate();
  const [isSubscribed, setIsSubscribed] = useState(false);

  const [showModal, setShowModal] = useState(false);
  const [closing, setClosing] = useState(false);
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email && phone) {
      setMessage("🎉 Subscribed successfully!");
      setIsSubscribed(true);
      setEmail("");
      setPhone("");
      handleClose();
    }
  };

  const handleClose = () => {
    setClosing(true);
    setTimeout(() => {
      setShowModal(false);
      setClosing(false);
    }, 300);
  };

  const handleShippingClick = (e) => {
    e.preventDefault();
    if (auth?.token) {
      navigate("/dashboard/user/orders");
      window.scrollTo(0, 0);
    } else {
      toast.error("Please login or register first");
      navigate("/login", { state: "/dashboard/user/orders" });
    }
  };

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h3>ABOUT US</h3>
          <ul>
            <li>
              <Link to="/about">Our Story</Link>
            </li>
            <li>
              <a href="#">Affiliate Program</a>
            </li>
            <li>
              <a href="#">Wholesale Program</a>
            </li>
            <li>
              <a href="#">Press Inquiries</a>
            </li>
            <li>
              <a href="#">Careers</a>
            </li>
          </ul>
        </div>

        <div className="footer-section">
          <h3>CUSTOMER SUPPORT</h3>
          <ul>
            <li>
              <a href="#">Returns & Exchanges</a>
            </li>
            <li>
              <a href="#" onClick={handleShippingClick}>
                Shipping Information
              </a>
            </li>
            <li>
              <a href="#" onClick={handleShippingClick}>
                Track Your Order
              </a>
            </li>

            <li>
              <Link to="/contact">Help Center</Link>
            </li>
            <li>
              <Link to="/contact">Contact</Link>
            </li>
          </ul>
        </div>

        <div className="footer-section">
          <h3>CONNECT WITH US</h3>
          <div className="social-icons">
            <a href="#">
              <FontAwesomeIcon icon={faFacebook} />
            </a>
            <a href="#">
              <FontAwesomeIcon icon={faXTwitter} />
            </a>
            <a href="#">
              <FontAwesomeIcon icon={faYoutube} />
            </a>

            <a href="#">
              <FontAwesomeIcon icon={faInstagram} />
            </a>
          </div>
          <div>
            <p>
              Want $20 Off? Sign up for our Newsletter.
              <br />
              Sign up for SMS alerts and be the first to know!
            </p>

            <button
              className="subscribe-btn"
              onClick={() => {
                if (!isSubscribed) setShowModal(true);
              }}
              disabled={isSubscribed}
            >
              {isSubscribed ? "Subscribed Already" : "Subscribe Now"}
            </button>
            {showModal && (
              <div className={`modal ${closing ? "closing" : ""}`}>
                <form className="modal-content" onSubmit={handleSubscribe}>
                  <h3>Subscribe</h3>
                  <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  <input
                    type="tel"
                    placeholder="Enter your phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                  />
                  <button type="submit">Submit</button>
                  <button type="button" onClick={handleClose}>
                    Cancel
                  </button>
                </form>
              </div>
            )}

            {message && <p>{message}</p>}
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="footer-links">
          <Link to="/about">About</Link> | <Link to="/contact">Contact</Link> |
          <Link to="/policy">Privacy Policy</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
