import React, { useReducer, useEffect, useState } from "react";
import { v4 as uuid_v4 } from "uuid";
import axios from "axios";
import logo from "../../assets/logo.png";
import industries from "./industry";
import { useHistory as historycheck } from "react-router-dom";

/* const Amount = [
  "$5,000-$10,000",
  "$10,000-$15,000",
  "$15,000-$20,000",
  "$20,000-$30,000",
  "$30,000-$50,0000",
  "$50,000-$100,000",
  "$100,000-$250,0000",
  "more than $250,000",
]; */

const Industry = industries();

const Purpose = [
  { name: "Business Line of Credit", value: "businesLine" },
  { name: "Business Term Loan", value: "businesterm" },
  { name: "Merchant Cash Advance", value: "businescash" },
  { name: "Business Cash Loan", value: "businesLoan" },
];

const state = {
  givenName: "",
  familyName: "",
  amount: "",
  purpose: "",
  company: "",
  industry: "",
  email: "",
  phoneNumber: "",
  address: "",
  tin: "",
  givenNameTouched: false,
  familyNameTouched: false,
  amountTouched: false,
  purposeTouched: false,
  companyTouched: false,
  industryTouched: false,
  emailTouched: false,
  phoneNumberTouched: false,
  addressTouched: false,
  tinTouched: false,
  termsChecked: false,
};

const LoanPageTwo = (props) => {
  /*  Coded By Subhash Vishwakarma */
  const [isValid, setIsValid] = useState(false);
  const history = historycheck();
  const handleValidation = (data) => {
    if (
      checkValidity(data.amount) &&
      checkValidity(data.givenName) &&
      checkValidity(data.familyName) &&
      checkValidity(data.industry) &&
      checkValidity(data.purpose) &&
      checkValidity(data.company) &&
      checkValidity(data.email) &&
      checkValidity(data.phoneNumber) &&
      checkValidity(data.address) &&
      checkValidity(data.tin) &&
      data.termsChecked
    ) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  };

  const checkValidity = (value) => {
    let isValid = true;
    isValid = value.trim() !== "" && isValid;
    return isValid;
  };

  const redirectToQb = () => {
    var uid = uuid_v4();
    sessionStorage.setItem("uid", uid);
    axios({
      method: "GET",
      url: `/authUri?uid=${uid}&state=${window.location.pathname}`,
    })
      .then((response) => {
        /* console.log("Response: ", response); */
        var parameters = "location=1,width=800,height=650";
        parameters +=
          ",left=" +
          (window.screen.width - 800) / 2 +
          ",top=" +
          (window.screen.height - 650) / 2;
        var win = window.open(response.data, "connectPopup", parameters);

        var pollOAuth = window.setInterval(function () {
          axios({ method: "GET", url: `/resolvedAuth?uid=${uid}` })
            .then((response) => {
              try {
                if (response.data) {
                  window.clearInterval(pollOAuth);
                  win.close();
                  getUserInfo(uid);
                }
              } catch (e) {
                console.log(e);
              }
            })
            .catch((err) => console.error("Error: ", err));
        }, 1000);
      })
      .catch((err) => console.error("Error: ", err));
  };

  const getUserInfo = (uid) => {
    axios({ method: "GET", url: `/getUserInfo?uid=${uid}` })
      .then((response) => {
        document.getElementById("close").click();
        /*  console.log("User Details: ", response.data); */
        // sessionStorage.setItem("formData", JSON.stringify(response.data));

        dispatch({
          type: "familyName",
          field: "familyName",
          value: response.data.familyName,
        });

        dispatch({
          type: "givenName",
          field: "givenName",
          value: response.data.givenName,
        });

        dispatch({
          type: "phoneNumber",
          field: "phoneNumber",
          value: response.data.phoneNumber,
        });

        dispatch({
          type: "email",
          field: "email",
          value: response.data.email,
        });

        // history.push("/loan/getStarted/connect");
      })
      .catch((err) => console.log("User Error: ", err));
  };

  const reducer = (state, action) => {
    handleValidation(state);
    switch (action.type) {
      case "givenName":
        return {
          ...state,
          [action.field]: action.value,
          givenNameTouched: true,
        };
      case "familyName":
        return {
          ...state,
          [action.field]: action.value,
          familyNameTouched: true,
        };
      case "amount":
        return { ...state, [action.field]: action.value, amountTouched: true };
      case "purpose":
        return { ...state, purpose: action.value, purposeTouched: true };
      case "company":
        return { ...state, [action.field]: action.value, companyTouched: true };
      case "industry":
        return { ...state, industry: action.value, industryTouched: true };
      case "email":
        return { ...state, [action.field]: action.value, emailTouched: true };
      case "phoneNumber":
        let validPhoneValue = "";
        if (action.value)
          validPhoneValue = action.value.match(/^[0-9+ ]+$/)
            ? action.value
            : state.phoneNumber;
        return {
          ...state,
          [action.field]: validPhoneValue,
          phoneNumberTouched: true,
        };
      case "address":
        return { ...state, [action.field]: action.value, addressTouched: true };
      case "tin":
        let validValue = "";
        if (action.value)
          validValue =
            action.value.match(/^[0-9-]+$/) && action.value.length <= 11
              ? action.value
              : state.tin;
        else validValue = "";
        return { ...state, [action.field]: validValue, tinTouched: true };
      case "termsChecked":
        return { ...state, [action.field]: action.value };
      default:
        return { ...state };
    }
  };

  const [formData, dispatch] = useReducer(reducer, state);
  const [showPsw, setShowPsw] = useState(false);
  const handleNav = () => {
    sessionStorage.setItem("currentView", "connect");
    sessionStorage.setItem("formData", JSON.stringify(formData));
    history.push("/loan/getStarted/connect");
    props.handleView("connect");
  };
  useEffect(() => {
    props.handleView("Get Started");
    sessionStorage.setItem("formData", "");
    sessionStorage.setItem("currentView", "Get Started");
  }, []);

  useEffect(() => {
    let isEmpty = handleValidation(formData);
    sessionStorage.setItem(isEmpty, "FormValid");
  }, [formData]);

  return (
    <div className="loanPageTwo">
      <div className="row ">
        <div className="col-sm-6 bg-light ">
          <header className="text-center">
            <h2 className="text-blue ">
              <b>Fast Funding For Your Business</b>
            </h2>
          </header>
          <br />
          <div className="text-gray text-left text-small">
            <p>
              <span className="glyphicon glyphicon-ok" />
              &nbsp;&nbsp; We enable faster loan process time by 90%. At a very
              low cost
            </p>
            <p>
              <span className="glyphicon glyphicon-ok" />
              &nbsp;&nbsp; Provide an intuitive self service experience for loan
              applicants to share financial data with ease.
            </p>
            <p>
              <span className="glyphicon glyphicon-ok" />
              &nbsp;&nbsp; Real-time access to customer financial data for loan
              origination process.
            </p>
            <p>
              <span className="glyphicon glyphicon-ok" />
              &nbsp;&nbsp; Expert developed algorithm for loan approval/score
              based on AI.
            </p>
            <p>
              <span className="glyphicon glyphicon-ok" />
              &nbsp;&nbsp; Automate monthly covenant monitoring post origination
            </p>
            <p>
              <span className="glyphicon glyphicon-ok" />
              &nbsp;&nbsp; Enable early warning and actions to manage risk of
              delinquency.
            </p>
            <p>
              <span className="glyphicon glyphicon-ok" /> &nbsp; Directly
              integrates into the loan origination system
            </p>
            <p>
              <span className="glyphicon glyphicon-ok" />
              &nbsp;&nbsp; Enable early warning and actions to manage risk of
              delinquency.
            </p>
            <br />
            <p>
              Getting an offer will not impact your credit score. Only in the
              case of sole proprietorships and partnerships, a hard credit
              inquiry will be made after you receive and accept your offer
              should you choose to do so.
              <br />
              <br />
              To help the U.S. government fight the funding of terrorism and
              money laundering activities, Federal law requires FIN-AXS to
              obtain, verify, and record information that identifies each
              individual or institution that opens an account or establishes a
              customer relationship.
            </p>
          </div>
        </div>
        <div className="col-sm-2"></div>
        <div className="col-sm-4 form-group bg-secondary text-center">
          <form onSubmit={(e) => e.preventDefault()}>
            <input
              placeholder="First Name"
              className={
                formData.givenName.trim() === "" && formData.givenNameTouched
                  ? "form-control border-red"
                  : "form-control"
              }
              value={formData.givenName}
              onChange={(e) => {
                dispatch({
                  type: "givenName",
                  field: "givenName",
                  value: e.target.value,
                });
              }}
            />
            {formData.givenName.trim() === "" && formData.givenNameTouched ? (
              <div className="text-left">
                <small className="color-red text-left">
                  &nbsp;&nbsp;&nbsp; Please Enter First Name
                </small>
              </div>
            ) : null}
            <input
              placeholder="Last Name"
              className={
                formData.familyName.trim() === "" && formData.familyNameTouched
                  ? "form-control border-red"
                  : "form-control"
              }
              value={formData.familyName}
              onChange={(e) => {
                dispatch({
                  type: "familyName",
                  field: "familyName",
                  value: e.target.value,
                });
              }}
            />{" "}
            {formData.familyName.trim() === "" && formData.familyNameTouched ? (
              <div className="text-left">
                <small className="color-red text-left">
                  &nbsp;&nbsp;&nbsp; Please Enter Last Name
                </small>
              </div>
            ) : null}
            <input
              placeholder="How Much Money Do You Need"
              className={
                formData.amount.trim() === "" && formData.amountTouched
                  ? "form-control border-red"
                  : "form-control"
              }
              value={formData.amount}
              onChange={(e) => {
                dispatch({
                  type: "amount",
                  field: "amount",
                  value: e.target.value,
                });
              }}
            />{" "}
            {formData.amount.trim() === "" && formData.amountTouched ? (
              <div className="text-left">
                <small className="color-red text-left">
                  &nbsp;&nbsp;&nbsp; Please Enter Amount
                </small>
              </div>
            ) : null}
            <select
              placeholder="Loan Type"
              className={
                formData.purpose.trim() === "" && formData.purposeTouched
                  ? "form-control border-red"
                  : "form-control"
              }
              value={formData.purpose}
              onChange={(e) => {
                dispatch({ type: "purpose", value: e.target.value });
              }}
            >
              <option className="text-gray" value="" disabled hidden>
                Choose a Loan Type
              </option>
              {Purpose.map((purpose, indx) => {
                return (
                  <option key={indx + "val"} value={purpose.name}>
                    {purpose.name}
                  </option>
                );
              })}
            </select>
            <input
              className={
                formData.company.trim() === "" && formData.companyTouched
                  ? "form-control border-red"
                  : "form-control"
              }
              placeholder="Company Name"
              value={formData.company}
              onChange={(e) => {
                dispatch({
                  type: "company",
                  field: "company",
                  value: e.target.value,
                });
              }}
            />{" "}
            {formData.company.trim() === "" && formData.companyTouched ? (
              <div className="text-left">
                <small className="color-red text-left">
                  &nbsp;&nbsp;&nbsp; Please Enter Company Name
                </small>
              </div>
            ) : null}
            <select
              placeholder="Industry Type"
              className={
                formData.industry.trim() === "" && formData.industryTouched
                  ? "form-control border-red"
                  : "form-control"
              }
              value={formData.industry}
              onChange={(e) => {
                dispatch({ type: "industry", value: e.target.value });
              }}
            >
              <option className="text-gray" value="" disabled hidden>
                Choose a Industry Type
              </option>
              {Industry.map((industry, indx) => {
                return (
                  <option
                    style={{ width: "40%" }}
                    key={indx + "val"}
                    value={industry}
                  >
                    {industry}
                  </option>
                );
              })}
            </select>
            <input
              className={
                formData.email.trim() === "" && formData.emailTouched
                  ? "form-control border-red"
                  : "form-control"
              }
              placeholder="Email Address"
              value={formData.email}
              onChange={(e) => {
                dispatch({
                  type: "email",
                  field: "email",
                  value: e.target.value,
                });
              }}
            />{" "}
            {formData.email.trim() === "" && formData.emailTouched ? (
              <div className="text-left">
                <small className="color-red text-left">
                  &nbsp;&nbsp;&nbsp; Please Enter Email Address
                </small>
              </div>
            ) : null}
            <input
              className={
                formData.phoneNumber.trim() === "" &&
                formData.phoneNumberTouched
                  ? "form-control border-red"
                  : "form-control"
              }
              placeholder="Phone Number"
              value={formData.phoneNumber}
              onChange={(e) => {
                dispatch({
                  type: "phoneNumber",
                  field: "phoneNumber",
                  value: e.target.value,
                });
              }}
            />{" "}
            {formData.phoneNumber.trim() === "" &&
            formData.phoneNumberTouched ? (
              <div className="text-left">
                <small className="color-red text-left">
                  &nbsp;&nbsp;&nbsp; Please Enter Phone Number
                </small>
              </div>
            ) : null}
            <input
              placeholder="Address"
              className={
                formData.address.trim() === "" && formData.addressTouched
                  ? "form-control border-red"
                  : "form-control"
              }
              value={formData.address}
              onChange={(e) => {
                dispatch({
                  type: "address",
                  field: "address",
                  value: e.target.value,
                });
              }}
            />{" "}
            {formData.address.trim() === "" && formData.addressTouched ? (
              <div className="text-left">
                <small className="color-red text-left">
                  &nbsp;&nbsp;&nbsp; Please Enter Address
                </small>
              </div>
            ) : null}
            <input
              className={
                formData.tin.trim() === "" && formData.tinTouched
                  ? "form-control border-red psw-eye"
                  : "form-control psw-eye"
              }
              placeholder="EIN/TIN Number"
              type={showPsw ? "text" : "password"}
              id="tin"
              value={formData.tin}
              onChange={(e) => {
                dispatch({
                  type: "tin",
                  field: "tin",
                  value: e.target.value,
                });
              }}
            />
            <span
              onClick={() => {
                setShowPsw(!showPsw);
              }}
              className={
                !showPsw
                  ? "glyphicon glyphicon-eye-open"
                  : "glyphicon glyphicon-eye-close"
              }
              aria-hidden="true"
            ></span>
            {formData.tin.trim() === "" && formData.tinTouched ? (
              <div className="text-left">
                <small className="color-red text-left">
                  &nbsp;&nbsp;&nbsp; Please Enter The Correct EIN/TIN#
                  <br />
                  &nbsp;&nbsp;&nbsp; EIN In Format xx-xxxxxxx
                  <br />
                  &nbsp;&nbsp;&nbsp; TIN In Format xxx-xx-xxxx
                </small>
              </div>
            ) : null}
            <div className="tacbox">
              <input
                id="checkbox"
                type="checkbox"
                onChange={(e) => {
                  dispatch({
                    type: "termsChecked",
                    field: "termsChecked",
                    value: e.target.checked,
                  });
                }}
              />
              <label htmlFor="checkbox" className="text-gray">
                I agree to FIN-AXS's Registration&nbsp;
                <a
                  target="_blank"
                  href="https://www.random.org/terms/2020-08-01/website"
                  rel="noreferrer"
                >
                  Terms and Conditions
                </a>
                &nbsp;& &nbsp;
                <a
                  target="_blank"
                  href="https://www.random.org/terms/2020-08-01/website"
                  rel="noreferrer"
                >
                  Privacy Policy
                </a>
                .
              </label>
            </div>
            <div>
              <button
                className="btn-round bg-white btn-width btn text-blue"
                onClick={() => handleNav()}
                style={{ fontSize: "small" }}
                disabled={!isValid}
              >
                <b>Get Started </b>
              </button>
            </div>
            OR
            <div>
              <button
                className="btn-round btn btn-width bg-teal"
                data-toggle="modal"
                style={{ fontSize: "small" }}
                data-target="#myModal"
              >
                Connect To Quickbooks
              </button>
            </div>
            OR
            <div>
              <button
                className="btn-round btn btn-width bg-teal"
                style={{ fontSize: "small" }}
                /*  data-toggle="modal"
                data-target="#myModal" */
              >
                Connect To Other Financial Systems
              </button>
            </div>
            <div className="modal fade" id="myModal">
              <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                  <div className="modal-header">
                    <img src={logo} width="200" height="60" alt="fin-axs" />
                    <button
                      type="button"
                      className="close"
                      data-dismiss="modal"
                    >
                      &times;
                    </button>
                  </div>

                  <div className="modal-body">
                    <h5 className="text-gray">
                      You will be redirected to Quickbooks site to login
                    </h5>
                    <br />
                    <h5 className="text-gray">
                      By choosing Connect, you are authorizing FIN-AXS API to
                      access(View/Update) your Quickbooks Company online data
                    </h5>
                  </div>

                  <div className="modal-footer text-center">
                    <div>
                      <button
                        className="btn-round btn-width btn bg-teal"
                        onClick={() => redirectToQb()}
                      >
                        Connect To Quickbooks
                      </button>
                    </div>
                    <br />
                    <div>
                      <button
                        className="btn-round bg-white btn-width btn text-blue"
                        data-dismiss="modal"
                        id="close"
                      >
                        <b>Cancel</b>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoanPageTwo;
