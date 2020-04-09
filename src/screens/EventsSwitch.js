import React from "react";
import { Switch, Route } from "react-router-dom";
import PrivateRoute from "../components/utils/PrivateRoute";

const EventsDashboardScreen = () => <text h2> DashBoard </text>;
const EventDetailsScreen = () => <text h2> EventDetails </text>;
const CreateNewEventScreen = () => <text h2> EventDetails </text>;

const EventsSwitch = ({ ...props }) => {
  debugger;
  return (
    <div>
      <Switch>
        <PrivateRoute path={`/home/events`} component={EventsDashboardScreen} />

        <PrivateRoute
          path={`/home/events/new`}
          component={CreateNewEventScreen}
        />

        <PrivateRoute
          path={`/home/events/:id`}
          component={EventDetailsScreen}
        />
      </Switch>
    </div>
  );
};

export default EventsSwitch;
