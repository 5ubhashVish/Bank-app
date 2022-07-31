import React from "react";
import whiteLogo from "../assets/logo-white.png";

const Footer = () => {
  return (
    <footer className="page-footer bg-blue pt-4">
      <div className="container-fluid text-left text-md-left">
        <div className="row">
          <div className="col-md-6 mt-md-0 mt-3">
            <div className="row">
              <div className="col-sm-8">
                <img src={whiteLogo} alt="fin-axs" />
                <br />
                <br />
                <p>
                  A Data Company focused on creating high fidelity real time
                  financial data to enable Banks and businesses compete in
                  digital based economy. This would enable for faster processing
                  of loans, KYC, reconciliation, visibility to investors and
                  partners to operate in a more connected world.
                </p>
              </div>
            </div>
          </div>

          <div className="col-md-3 text-center mb-md-0 mb-3">
            <h5>About Us</h5>
            <hr className="dotted-ul" />
            <ul className="list-unstyled">
              <li>
                <a href="#!">Our Customers</a>
              </li>
              <li>
                <a href="#!">Coummunity Page</a>
              </li>
              <li>
                <a href="#!">Help & Support</a>
              </li>
            </ul>
          </div>
          <div className="col-md-3 text-center mb-md-0 mb-3">
            <h5>Contact Us</h5>
            <hr className="dotted-ul" />
            <ul className="list-unstyled">
              <li>
                <a href="#!">
                  <span className="glyphicon glyphicon-earphone" /> &nbsp; +1
                  (248) 231-5536
                </a>
              </li>
              <li>
                <a href="#!">
                  <span className="glyphicon glyphicon-envelope" /> &nbsp;
                  info@fin-axs.com
                </a>
              </li>
              <li>
                <a href="#!">
                  <span className="glyphicon glyphicon-map-marker" />
                  &nbsp; 45302 Bartlett Dr,
                  <br /> &nbsp; Novi, MI 48377, <br />
                  United States
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <br />
      <div className="footer-copyright ml-4 text-left py-3">
        © 2021 Copyright
      </div>
      <br />
    </footer>
  );
};

export default Footer;
