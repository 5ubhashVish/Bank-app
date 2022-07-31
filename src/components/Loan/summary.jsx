import React, { useEffect, useState } from "react";
import { useHistory as historycheck } from "react-router-dom";

const Summary = (props) => {
  const [formData, setFormData] = useState({});
  const [formIsValid, setFormIsValid] = useState(false);
  const [showTin, setShowTin] = useState(false);
  useEffect(() => {
    props.handleView("summary");
    sessionStorage.setItem("currentView", "summary");
    setFormIsValid(sessionStorage.getItem("FormValid"));
    setFormData(JSON.parse(sessionStorage.getItem("formData")));
  }, []);
  const history = historycheck();
  const redirectToHome = () => {
    document.getElementById("close").click();
    history.push("/loan/getStarted");
  };

  return (
    <div className="loanPageOne">
      <h4 className="text-blue">
        <u>Basic Information</u> &nbsp;
        {formIsValid ? (
          <span className="glyphicon glyphicon-remove-circle" />
        ) : (
          <span className="glyphicon glyphicon-ok-circle" />
        )}
      </h4>
      <br />
      <div className="row text-left about-list">
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
      <hr />
      <h4 className="text-blue">
        <u> Connect to Bank/ Upload Documents</u> &nbsp;
        <span className="glyphicon glyphicon-remove-circle" />
      </h4>
      <br />
      <div className="row">
        <div className="col-md-2"></div>
        <div className="col-sm-8 text-left ">
          <div className="media">
            <label>Bank Statement</label>&nbsp; : &nbsp;
            <span>Uploaded </span>
            <span className="glyphicon glyphicon-new-window" />
            &nbsp;
            <span className="glyphicon glyphicon-ok-circle" />
          </div>
          <div className="media">
            <label>Driver License</label>&nbsp; : &nbsp;
            <span>Uploaded </span>
            <span className="glyphicon glyphicon-new-window" />
            &nbsp;
            <span className="glyphicon glyphicon-ok-circle" />
          </div>
          <div className="media">
            <label>Tax Documents</label>&nbsp; : &nbsp;
            <span>Uploaded </span>
            <span className="glyphicon glyphicon-new-window" />
            &nbsp;
            <span className="glyphicon glyphicon-ok-circle" />
          </div>
          <div className="media">
            <label>Business Registration</label>&nbsp; : &nbsp;
            <span>Missing </span>
            <span className="glyphicon glyphicon-new-window" />
            &nbsp;
            <span className="glyphicon glyphicon-remove-circle" />
          </div>
        </div>
      </div>

      <br />
      <hr />
      <h4 className="text-blue">
        <u>Financial Statements</u> &nbsp;
        <span className="glyphicon glyphicon-remove-circle" />
      </h4>
      <br />
      <hr />
      <br />
      <br />
      <div
        className="row "
        style={{ display: "flex", justifyContent: "center" }}
      >
        {/*  <div className="col-sm-1"></div> */}

        <div className="col-sm-3">
          <button
            className="btn-round bg-white btn text-blue"
            data-toggle="modal"
            data-target="#connectToBank"
            style={{ width: "80%" }}
          >
            Cancel Application
          </button>
        </div>
        <div className="col-sm-3">
          <button
            className="btn-round btn"
            style={{ width: "80%", backgroundColor: "#ff971d", color: "white" }}
          >
            <b>Save for later </b>
          </button>
        </div>

        <div className="col-sm-3">
          <button
            className="btn-round btn  bg-teal"
            /*  to="/upload-file" */
            style={{ width: "80%" }}
            /* onClick={() => uploadFile} */
          >
            Submit Application
          </button>
        </div>
      </div>
      <br />
      <div className="modal fade" id="connectToBank">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <button type="button" className="close" data-dismiss="modal">
                &times;
              </button>
            </div>

            <div className="modal-body">
              <h5 className="text-gray">
                Are you sure you want to cancel the application ?
              </h5>
            </div>

            <div className="modal-footer text-center">
              <div>
                <button
                  className="btn-round btn-width btn bg-teal"
                  onClick={() => redirectToHome()}
                >
                  Yes
                </button>
              </div>
              <br />
              <div>
                <button
                  className="btn-round bg-white btn-width btn text-blue"
                  data-dismiss="modal"
                  id="close"
                >
                  <b>No</b>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Summary;
