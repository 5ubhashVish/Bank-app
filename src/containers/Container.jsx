import React, { Component } from "react";

import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

import logo from "../assets/logo.png";
import Breadcrumb from "../components/Breadcrumbs";

class Container extends Component {
  /*  Coded By Subhash Vishwakarma  */
  constructor() {
    super();
    this.state = {
      currentView: "About",
      currentComponent: "About",
      crumbs: [
        {
          value: "Home",
          href: "/",
        },
        {
          value: "About",
          href: "/",
        },
      ],
    };
  }

  handleBreadCrumbs = (currentView) => {
    let currentCrumbs = [...this.state.crumbs];
    switch (currentView) {
      case "About":
        currentCrumbs = [
          {
            value: "Home",
            href: "/",
          },
          {
            value: "About",
            href: "/about",
          },
        ];
        break;
      case "Services":
        currentCrumbs = [
          {
            value: "Home",
            href: "/",
          },
          {
            value: "Services",
            href: "/services",
          },
        ];
        break;
      case "Loan":
        currentCrumbs = [
          {
            value: "Home",
            href: "/",
          },
          {
            value: "Loan",
            href: "/loan",
          },
        ];
        break;
      case "Blog":
        currentCrumbs = [
          {
            value: "Home",
            href: "/",
          },
          {
            value: "Blog",
            href: "/blog",
          },
        ];
        break;
      case "Contact Us":
        currentCrumbs = [
          {
            value: "Home",
            href: "/",
          },
          {
            value: "Contact Us",
            href: "/contact-us",
          },
        ];
        break;
      case "Get Started":
        currentCrumbs = [
          {
            value: "Home",
            href: "/",
          },
          {
            value: "Loan",
            href: "/loan",
          },
          {
            value: "Basic Information",
            href: "/loan/getStarted",
          },
        ];
        break;
      case "connect":
        currentCrumbs = [
          {
            value: "Home",
            href: "/",
          },
          {
            value: "Loan",
            href: "/loan",
          },
          {
            value: "Basic Information",
            href: "/loan/getStarted",
          },
          {
            value: "Connect To Bank/ Upload Documents",
            href: "/loan/getStarted/connect",
          },
        ];
        break;
      case "upload":
        currentCrumbs = [
          {
            value: "Home",
            href: "/",
          },
          {
            value: "Loan",
            href: "/loan",
          },
          {
            value: "Basic Information",
            href: "/loan/getStarted",
          },
          {
            value: "Connect To Bank/Upload Documents",
            href: "/loan/getStarted/connect",
          },
          {
            value: "Upload",
            href: "/upload-file",
          },
        ];
        break;
      case "summary":
        currentCrumbs = [
          {
            value: "Home",
            href: "/",
          },
          {
            value: "Loan",
            href: "/loan",
          },
          {
            value: "Basic Information",
            href: "/loan/getStarted",
          },
          {
            value: "Connect To Bank/Upload Documents ",
            href: "/loan/getStarted/connect",
          },
          {
            value: "Application Summary",
            href: "/loan/getStarted/connect/summary",
          },
        ];
        break;
      default:
        currentCrumbs = [
          {
            value: "Home",
            href: "/",
          },
          {
            value: "About",
            href: "/",
          },
        ];
        break;
    }
    return (
      <Breadcrumb
        crumbs={currentCrumbs}
        handleNavigation={(view) => this.handleNavigation(view)}
      />
    );
  };

  handleCurrentPage(page) {
    console.log(page);
    this.setState({
      currentComponent: page,
    });
  }

  handleNavigation(currentview) {
    sessionStorage.setItem("currentView", currentview);
    this.setState({
      currentView: currentview,
    });
  }

  render() {
    return (
      <div className="App">
        <div className="row pad">
          <div className="col-sm-2 ">
            <img src={logo} width="200" height="60" alt="fin-axs" />
          </div>
          <div className="col-sm-6"></div>
          <div className="col-sm-4 verticle-align">
            <Navbar
              currentView={this.state.currentView}
              handleNavigation={(view) => this.handleNavigation(view)}
            />
          </div>
        </div>
        <div className="row position-relative text-center">
          <div className="coloured ">
            <h3>{this.state.currentView} </h3>
          </div>
          <div className="position-absolute overlap ">
            <div className="rounded">
              {this.handleBreadCrumbs(sessionStorage.getItem("currentView"))}
            </div>
          </div>
        </div>
        <div className="container">{this.props.children}</div>
        <Footer />
      </div>
    );
  }
}

export default Container;
