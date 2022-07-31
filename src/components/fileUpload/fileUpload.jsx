import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./dropzone.css";

const FileUpload = (props) => {
  let [file, setFile] = useState(null);
  let [filename, setFilename] = useState("");
  useEffect(() => {
    props.handleView("Loan");
    sessionStorage.setItem("currentView", "upload");
  }, []);

  const fileChangedHandler = (event, fileId) => {
    let file = event.target.files[0];
    let reader = new FileReader();
    /**Capture filename */
    if (file) {
      if (
        file.type !== "image/jpg" &&
        file.type !== "image/png" &&
        file.type !== "application/pdf"
      ) {
        window.alert("File does not support. You must use .png .jpg or .pdf ");
        document.getElementById(fileId).value = null;
        return false;
      } else {
        setFilename(file.name);
        reader.onload = function (e) {
          setFile(e.target.result);
        };
        reader.readAsDataURL(event.target.files[0]);
      }
    }

    /*   if (file.size > e6) {
      window.alert("Please upload a file smaller than 1 MB");
      return false;
    } */
  };

  return (
    <div className="fileUpload">
      <div className="file-container">
        <div className="row">
          <div className="col-sm-3">
            <input
              className="form-control"
              type="text"
              value="Drivers license"
              readOnly={true}
            />
          </div>
          <div className="col-sm-3">
            <input
              accept="application/pdf ,image/jpeg ,image/jpg,image/png"
              type="file"
              id="driverLicense"
              name={filename}
              onChange={(e) => fileChangedHandler(e, "driverLicense")}
            />
          </div>
          <div className="col-sm-4">
            <input className="form-control" type="text" placeholder="Remarks" />
          </div>
        </div>
        <div className="row">
          <div className="col-sm-3">
            <input
              className="form-control"
              type="text"
              value="Business registration"
              readOnly={true}
            />
          </div>
          <div className="col-sm-3">
            <input
              accept="application/pdf ,image/jpeg ,image/jpg,image/png"
              type="file"
              id="business"
              onChange={(e) => fileChangedHandler(e, "business")}
            />
          </div>
          <div className="col-sm-4">
            <input className="form-control" type="text" placeholder="Remarks" />
          </div>
        </div>

        <div className="row">
          <div className="col-sm-3">
            <input
              className="form-control"
              type="text"
              value="Tax document"
              readOnly={true}
            />
          </div>
          <div className="col-sm-3">
            <input
              accept="application/pdf ,image/jpeg ,image/jpg,image/png"
              type="file"
              id="tax"
              onChange={(e) => fileChangedHandler(e, "tax")}
            />
          </div>
          <div className="col-sm-4">
            <input className="form-control" type="text" placeholder="Remarks" />
          </div>
        </div>

        <div className="row">
          <div className="col-sm-3">
            <input
              className="form-control"
              type="text"
              value="Bank statement"
              readOnly={true}
            />
          </div>
          <div className="col-sm-3">
            <input
              accept="application/pdf ,image/jpeg ,image/jpg,image/png"
              type="file"
              id="bank"
              onChange={(e) => fileChangedHandler(e, "bank")}
            />
          </div>
          <div className="col-sm-4">
            <input className="form-control" type="text" placeholder="Remarks" />
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
            className="btn-round btn  bg-teal"
            /*  data-toggle="modal"
            data-target="#connectToBank" */
            style={{ width: "80%" }}
            to="/loan/getStarted/connect/summary"
          >
            Upload
          </Link>
        </div>
      </div>
      <br />
      <div className="row">
        <div className="col-sm-12 text-center">
          <Link
            className="btn-round bg-white btn text-blue"
            to="/loan/getStarted/connect"
            style={{ width: "20%" }}
          >
            <b>Back </b>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FileUpload;
