import React, { useState } from "react";
import { Route, Switch } from "react-router-dom";

import "./App.css";

import Container from "./containers/Container";
import LoanPageOne from "./components/Loan/pageOne";
import LoanPageTwo from "./components/Loan/pageTwo";
import AboutPageOne from "./components/About/pageOne";
import ServicePageOne from "./components/Services/pageOne";
import BlogPageOne from "./components/Blog/pageOne";
import ContactPageOne from "./components/Contact/pageOne";
import FileUpload from "./components/fileUpload/fileUpload";
import LoanPageThree from "./components/Loan/pageThree";
import Summary from "./components/Loan/summary";
function App() {
  const [view, setview] = useState("About");
  const handleView = (view) => {
    setview(view);
    setTimeout(() => {
      setview("About");
    }, 100);
  };

  return (
    <Container view={view}>
      <Switch>
        <Route path="/about" exact component={AboutPageOne} />
        <Route
          path="/loan"
          exact
          render={(props) => (
            <LoanPageOne handleView={(view) => handleView(view)} />
          )}
        />
        <Route
          path="/loan/getStarted"
          exact
          render={(props) => (
            <LoanPageTwo handleView={(view) => handleView(view)} />
          )}
        />
        <Route
          path="/loan/getStarted/connect"
          exact
          render={(props) => (
            <LoanPageThree handleView={(view) => handleView(view)} />
          )}
        />
        <Route path="/services" exact component={ServicePageOne} />
        <Route path="/blog" exact component={BlogPageOne} />
        <Route path="/contact-us" exact component={ContactPageOne} />
        <Route
          path="/upload-file"
          exact
          render={(props) => (
            <FileUpload handleView={(view) => handleView(view)} />
          )}
        />
        <Route
          path="/loan/getStarted/connect/summary"
          exact
          render={(props) => (
            <Summary handleView={(view) => handleView(view)} />
          )}
        />
      </Switch>
    </Container>
  );
}
export default App;
