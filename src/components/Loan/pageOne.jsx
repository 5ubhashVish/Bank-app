import React, { useEffect } from "react";
import { Link } from "react-router-dom";

import image from "../../assets/image1.png";

const LoanPageOne = (props) => {
  /*  Coded By Subhash Vishwakarma */
  const handleNav = () => {
    sessionStorage.setItem("currentView", "Get Started");
    props.handleView("Get Started");
  };

  useEffect(() => {
    props.handleView("Loan");
    sessionStorage.setItem("formData", "");
    sessionStorage.setItem("currentView", "Loan");
  }, []);

  return (
    <div className="loanPageOne text-left">
      <div className="row">
        <div className="col-sm-5">
          <header>
            <h1 className="text-blue"> Better banking for your business </h1>
            <h3 className="text-gray">
              Flexible funding, Payments and checking <br /> built for business
            </h3>
          </header>
          <div>
            <Link
              className="btn-round btn btn-width bg-white"
              to="/loan/getStarted"
              onClick={() => handleNav()}
            >
              Get Started
            </Link>
          </div>
        </div>
        <div className="col-sm-7">
          <img src={image} alt="group-im" />
        </div>
      </div>
    </div>
  );
};

export default LoanPageOne;
