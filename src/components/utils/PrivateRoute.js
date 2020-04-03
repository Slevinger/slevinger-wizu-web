import React from "react";
import { Route, Redirect } from "react-router-dom";
import { mobxConnect } from "../../mobx/mobxConnect";

const PrivateRouter = ({ children, user, ...rest }) => {
  debugger;
  return (
    <Route
      {...rest}
      render={({ location }) =>
        user ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/auth/signup",
              state: { from: location }
            }}
          />
        )
      }
    />
  );
};

export default mobxConnect(({ authStore: { user } }) => ({ user }))(
  PrivateRouter
);
