import React, { useEffect } from "react";
import Layout from "./../components/Layout/Layout";
import { BiMailSend, BiPhoneCall, BiSupport } from "react-icons/bi";

const About = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <Layout title={"Contact Us"}>
      <div className="row contact-us col-md-10 offset-md-2 ">
        <div className="col-md-5">
          <img
            src="/images/contact.jpg"
            alt="contactus"
            style={{ width: "100%", height: "100%" }}
          />
        </div>
        <div className="col-md-5">
          <h1 className="p-2" style={{ color: "#013c50" }}>
            {" "}
            CONTACT US
          </h1>
          <p className="text-justify mt-2">
            Any query and info about the product feel free to call anytime. We
            are 24x7 available.
          </p>
          <p className="mt-3">
            <BiMailSend /> : www.allnest.com
          </p>
          <p className="mt-3">
            <BiPhoneCall /> : 012-3456789
          </p>
          <p className="mt-3">
            <BiSupport /> : 1800-0000-0000 (toll-free)
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default About;
