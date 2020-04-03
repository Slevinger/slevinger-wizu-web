import React, { useMemo } from "react";
import LandingPage from "./LandingPage";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import PrivateRoute from "../components/utils/PrivateRoute";
import AuthScreen from "./AuthScreen";
import { mobxConnect } from "../mobx/mobxConnect";

const MainRouter = ({ currentPath }) => {
  return (
    <Router>
      <Switch>
        <Route path="/auth">
          <AuthScreen />
        </Route>
        <PrivateRoute path="/">
          <LandingPage />
        </PrivateRoute>
      </Switch>
    </Router>
  );
};

export default mobxConnect(({ navigationStore: { currentPath } }) => {
  return {
    currentPath
  };
})(MainRouter);
