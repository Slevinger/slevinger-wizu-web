import React from "react";
import { Route, Redirect } from "react-router-dom";
import { mobxConnect } from "../../mobx/mobxConnect";

const PrivateRouter = ({ children, user, ...rest }) => {
  return (
    <Route {...rest}>{user ? children : <Redirect to="/auth/signup" />}</Route>
  );
};

export default mobxConnect(({ authStore: { user } }) => ({ user }))(
  PrivateRouter
);
