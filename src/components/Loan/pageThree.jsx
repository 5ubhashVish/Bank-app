import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";

const LoanPageThree = (props) => {
  const [formData, setFormData] = useState({});
  const [showTin, setShowTin] = useState(false);
  useEffect(() => {
    props.handleView("connect");
    sessionStorage.setItem("currentView", "connect");
    setFormData(JSON.parse(sessionStorage.getItem("formData")));
  }, []);

  const uploadFile = () => {
    props.handleView("upload");
    sessionStorage.setItem("currentView", "upload");
  };

  return (
    <div className="loanPageOne">
      <h4 className="text-blue">Application No : 412312 </h4>
      <br />
      <div
        className="row text-left about-list"
        style={{ display: "flex", justifyContent: "center" }}
      >
        <div className="col-md-2"></div>
        <div className="col-md-5">
          <div className="media">
            <label>First Name</label>&nbsp; : &nbsp;
            <span>{formData.givenName} </span>
          </div>
          <div className="media">
            <label>Loan Amount</label>&nbsp; : &nbsp;
            <span>{formData.amount} </span>
          </div>
          <div className="media">
            <label>Company Name</label>&nbsp; : &nbsp;
            <span>{formData.company}</span>
          </div>
          <div className="media">
            <label>Email Address</label>&nbsp; : &nbsp;
            <span>{formData.email} </span>
          </div>
          <div className="media">
            <label>Address</label>&nbsp; : &nbsp;
            <span>{formData.address} </span>
          </div>
        </div>
        <div className="col-md-5">
          <div className="media">
            <label>Last Name</label>&nbsp; : &nbsp;
            <span>{formData.familyName} </span>
          </div>
          <div className="media">
            <label>Phone Number</label>&nbsp; : &nbsp;
            <span>{formData.phoneNumber} </span>
          </div>
          <div className="media">
            <label>Loan Type</label>&nbsp; : &nbsp;
            <span>{formData.purpose} </span>
          </div>
          <div className="media">
            <label>Industry Type</label>&nbsp; : &nbsp;
            <span>{formData.industry} </span>
          </div>
          <div className="media">
            <label>EIN/TIN Number</label>&nbsp; : &nbsp;
            {showTin ? (
              <span>
                {formData.tin} &nbsp;
                <i
                  onClick={() => setShowTin(false)}
                  className="glyphicon glyphicon-eye-close"
                ></i>
              </span>
            ) : (
              <span>
                ********* &nbsp;
                <i
                  onClick={() => setShowTin(true)}
                  className="glyphicon glyphicon-eye-open"
                ></i>
              </span>
            )}
          </div>
        </div>
      </div>
      <br />
      <br />
      <div className="row">
        <div className="col-sm-3"></div>
        <div className="col-sm-3">
          <button
            className="btn-round bg-white btn text-blue"
            to="/loan/getStarted/connect"
            style={{ width: "80%" }}
          >
            <b>Save for later </b>
          </button>
        </div>

        <div className="col-sm-3">
          <Link
            className="btn-round btn"
            style={{ width: "80%", backgroundColor: "#ff971d", color: "white" }}
            to="/upload-file"
            onClick={() => uploadFile}
          >
            Upload Documents
          </Link>
        </div>
      </div>
      <br />
      <div className="row">
        <div className="col-sm-3"></div>
        <div className="col-sm-3">
          <button
            className="btn-round btn  bg-teal"
            data-toggle="modal"
            data-target="#connectToBank"
            style={{ width: "80%" }}
          >
            Connect To Bank
          </button>
        </div>
        <div className="col-sm-3">
          <Link
            className="btn-round bg-white btn text-blue"
            style={{ width: "80%" }}
            to="/loan/getStarted"
          >
            Back
          </Link>
        </div>
      </div>

      <div className="modal fade" id="connectToBank">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <img src={logo} width="200" height="60" alt="fin-axs" />
              <button type="button" className="close" data-dismiss="modal">
                &times;
              </button>
            </div>

            <div className="modal-body">
              <h5 className="text-gray">
                You will be redirected to Bank site to login
              </h5>
              <br />
              <h5 className="text-gray">
                By choosing Connect, you are authorizing FIN-AXS API to
                access(View/Update) your Bank Company online data
              </h5>
            </div>

            <div className="modal-footer text-center">
              <div>
                <button
                  className="btn-round btn-width btn bg-teal"
                  to="/loan/getStarted/connect/summary"
                >
                  Connect To Bank
                </button>
              </div>
              <br />
              <div>
                <button
                  className="btn-round bg-white btn-width btn text-blue"
                  data-dismiss="modal"
                >
                  <b>Cancel</b>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoanPageThree;
