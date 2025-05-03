import React from "react";
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
// const Footer = () => {
//   return (
//     <div className="footer">
//       <h1 className="text-center ">All Right Reserved &copy; AllNest</h1>
//       <p className="text-center mt-3">
//         <Link to="/about">About</Link> | <Link to="/contact">Contact</Link> |{" "}
//         <Link to="/policy">Privacy Policy</Link>
//       </p>
//     </div>
//   );
// };
const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h3>ABOUT US</h3>
          <ul>
            <li>
              <a href="#">Our Story</a>
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
              <a href="#">Shipping Information</a>
            </li>
            <li>
              <a href="#">Track Your Order</a>
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
          <p>
            Want $20 Off? Sign up for our Newsletter.
            <br />
            Sign up for SMS alerts and be the first to know!
          </p>
          <button className="subscribe-btn"> Subscribe Now</button>
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
