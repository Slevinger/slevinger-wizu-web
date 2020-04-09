import React from "react";
import { NavButton } from "../components/utils/NavLink";
import { Switch, Route } from "react-router-dom";
import { RedBar } from "../components/StyledComponents";
import { makeStyles } from "@material-ui/core/styles";
import PrivateRoute from "../components/utils/PrivateRoute";
import ProfileScreen from "../screens/ProfileScreen";
import NotificationsScreen from "../screens/NotificationsScreen";
import EventsSwitch from "./EventsSwitch";

const Home = () => <div>Home</div>;

const useStyles = makeStyles({
  root: {
    border: 0,
    borderRadius: 3,
    boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
    color: "white",
    height: 48,
    padding: "0 30px"
  }
});
export default () => {
  const classes = useStyles();
  return (
    <div>
      <RedBar style={{ display: "flex" }}>
        <NavButton to="/home" className={classes.root}>
          Home
        </NavButton>
        <NavButton to="/home/events" className={classes.root}>
          Events
        </NavButton>
        <NavButton to="/home/notifications" className={classes.root}>
          notifications
        </NavButton>
        <div
          style={{
            flex: 1,
            textAlign: "end",
            marginRight: "50px"
          }}
        >
          <NavButton to="/home/profile" className={classes.root}>
            Profile
          </NavButton>
        </div>
      </RedBar>

      <div
        style={{
          marginRight: "10%",
          marginLeft: "10%",
          marginBottom: "100px",
          marginTop: "10px",
          padding: "0",
          position: "absolute",
          backgroundColor: "white",
          minHeight: "720px",
          width: "80vw",
          boxShadow: "2px 4px 2px 2px rgba(0,0,0,0.23)"
        }}
      >
        <div>
          <Switch>
            <PrivateRoute
              path={`/home/notifications`}
              component={NotificationsScreen}
            />
            <PrivateRoute path={`/home/profile`} component={ProfileScreen} />>
            <PrivateRoute path={`/home/events`} component={EventsSwitch} />>
            <PrivateRoute path={`/home`} component={Home} />
          </Switch>
        </div>
      </div>
    </div>
  );
};
