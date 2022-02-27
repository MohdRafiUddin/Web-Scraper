// React, Redux
import React, { useEffect } from "react";
import { connect } from "react-redux";
// React Router
import { BrowserRouter, Route } from "react-router-dom";
// Actions
import * as actions from "../actions";
// Internal Components
import Header from "./Header";
import Landing from "./Landing";
import Dashboard from "./Dashboard";

/**
 * App is the main entry component which is resposible for rendering main
 * App component and loading initial user & user data
 * @param {object} props
 * @returns
 */
const App = (props) => {
  const { fetchUser, fetchData } = props;
  useEffect(() => {
    fetchUser();
    fetchData();
  }, []);

  return (
    <BrowserRouter>
      <React.StrictMode>
        <Header />
        <Route exact path="/" component={Landing} />
        <Route path="/dashboard" component={Dashboard} />
      </React.StrictMode>
    </BrowserRouter>
  );
};

export default connect(null, actions)(App);
