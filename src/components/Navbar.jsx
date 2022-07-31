import React from "react";
import { Link } from "react-router-dom";

const Navbar = (props) => {
  return (
    <nav className="navbar navbar-expand-lg  navbar-light">
      <Link
        className={
          props.currentView === "About"
            ? "navbar-brand active"
            : "navbar-brand text-gray"
        }
        onClick={() => props.handleNavigation("About", false)}
        to="/about"
      >
        About
      </Link>
      <Link
        className={
          props.currentView === "Services"
            ? "navbar-brand active"
            : "navbar-brand text-gray"
        }
        onClick={() => props.handleNavigation("Services", false)}
        to="/services"
      >
        Services
      </Link>
      <Link
        className={
          props.currentView === "Loan"
            ? "navbar-brand active"
            : "navbar-brand text-gray"
        }
        onClick={() => props.handleNavigation("Loans", false)}
        to="/loan"
      >
        Loans
      </Link>
      <Link
        className={
          props.currentView === "Blog"
            ? "navbar-brand active "
            : "navbar-brand text-gray"
        }
        onClick={() => props.handleNavigation("Blog", false)}
        to="/blog"
      >
        Blog
      </Link>
      <Link
        className={
          props.currentView === "Contact Us"
            ? "navbar-brand active"
            : "navbar-brand text-gray"
        }
        onClick={() => props.handleNavigation("Contact Us", false)}
        to="/contact-us"
      >
        Contact Us
      </Link>
    </nav>
  );
};

export default Navbar;
