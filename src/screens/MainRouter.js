import React, { useMemo } from "react";
import LandingPage from "./LandingPage";
import { Router, Switch, Route, Redirect } from "react-router-dom";
import PrivateRoute from "../components/utils/PrivateRoute";
import AuthScreen from "./AuthScreen";
import { mobxConnect } from "../mobx/mobxConnect";

const MainRouter = ({ history, user }) => {
  console.log(user);
  return (
    <Router history={history}>
      <Switch>
        <Route path="/auth" component={AuthScreen} />
        <PrivateRoute path="/home">
          <LandingPage />
        </PrivateRoute>
        <Redirect from="/" to="/home" />
      </Switch>
    </Router>
  );
};

export default mobxConnect(
  ({ navigationStore: { history }, authStore: { user } }) => {
    return {
      history,
      user
    };
  }
)(MainRouter);
