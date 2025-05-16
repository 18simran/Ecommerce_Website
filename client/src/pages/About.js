import React, { useEffect } from "react";
import Layout from "./../components/Layout/Layout";

const About = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <Layout title={"About us - ALLNEST"}>
      <div className="row contact-us col-md-10 offset-md-1 ">
        <div className="col-md-5">
          <img
            src="/images/about.jpg"
            alt="contactus"
            style={{ width: "100%", marginLeft: "60px" }}
          />
        </div>
        <div className="col-md-4">
          <h2 style={{ color: "#013c50" }}>About Us</h2>
          <p className="text-justify mt-4">
            Welcome to{" "}
            <span
              style={{
                "font-weight": "bold",
                "font-size": "18px",
                color: "#013c50",
              }}
            >
              ALLNEST
            </span>
            , your one-stop destination for everything you need! From fashion
            and electronics to home essentials and more, we bring you a wide
            range of quality products at unbeatable prices. Our mission is to
            make shopping easy, affordable, and enjoyable—right from the comfort
            of your home. We’re committed to providing fast delivery, secure
            payments, and exceptional customer service to ensure your
            satisfaction every step of the way.
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default About;
