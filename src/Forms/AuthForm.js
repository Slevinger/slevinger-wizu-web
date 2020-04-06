import React, { useEffect, useState, useCallback } from "react";
import { TextField } from "../components/StyledComponents";
import { makeStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";
import { mobxConnect } from "../mobx/mobxConnect";
import { useLocation, NavLink } from "react-router-dom";
// import NavLink from "../components/utils/NavLink";

const useStyles = makeStyles(theme => ({
  root: {
    flexDirection: "column",
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "25ch"
    }
  }
}));

const AuthLink = ({ isSignUp, ...rest }) => {
  return isSignUp ? (
    <NavLink {...rest} to="/auth">
      Allready have an account? move to Login!
    </NavLink>
  ) : (
    <NavLink {...rest} to="/auth/signup">
      Dont have an account yet? move to Signup
    </NavLink>
  );
};

const AuthForm = ({ login, signup }) => {
  const classes = useStyles();
  const location = useLocation();

  const isSignUp =
    location.pathname
      .split("/")
      [location.pathname.split("/").length - 1].toLowerCase() === "signup";

  const handleSubmit = useCallback(
    async event => {
      event.preventDefault();
      const form = event.target.closest("form");
      const formData = new FormData(form);
      const data = {};
      for (let name of formData.keys()) {
        // const input = form.elements[name];
        data[name] = formData.get(name);
      }
      if (isSignUp) {
        await signup(data);
      } else {
        await login(data);
      }
      console.log(data);
    },
    [isSignUp]
  );

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        backgroundColor: "white"
      }}
    >
      <form
        className={classes.root}
        style={{ flexDirection: "column", display: "flex" }}
        noValidate
        autoComplete="off"
      >
        {isSignUp && (
          <>
            <TextField
              name="phone"
              style={{ width: 400 }}
              id="outlined-basic"
              label="Phone Number"
              variant="outlined"
            />
            <TextField
              name="email"
              style={{ width: 400 }}
              id="outlined-basic"
              label="Email"
              variant="outlined"
            />
          </>
        )}
        <TextField
          style={{ width: 400 }}
          id="outlined-basic"
          name="username"
          label="Username"
          value="slevinger"
          variant="outlined"
        />
        <TextField
          style={{ width: 400 }}
          type="password"
          name="password"
          id="outlined-basic"
          value="123456"
          label="Password"
          variant="outlined"
        />
        <AuthLink style={{ margin: "10px" }} isSignUp={isSignUp} />
        <Button
          onClick={handleSubmit}
          variant="contained"
          color="primary"
          href="#contained-buttons"
        >
          {isSignUp ? "Sign Up" : "Login"}
        </Button>
      </form>
    </div>
  );
};

export default mobxConnect(
  ({ authStore: { login, signup }, navigationStore: { currentPath } }) => {
    return {
      login,
      signup,
      currentPath
    };
  }
)(AuthForm);
