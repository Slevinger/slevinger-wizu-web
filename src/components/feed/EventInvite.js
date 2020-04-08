import React from "react";

import { NavLink } from "react-router-dom";
import { Spacer } from "../StyledComponents";
import { PostImage } from "./StyledFeedComponents";

import { mobxConnect } from "../../mobx/mobxConnect";
import { distanceFromTodayText } from "../../utils/timeDescriptor";
import moment from "moment";
import capitalize from "lodash/capitalize";
import * as Colors from "../../const/Colors";

const EventInvite = ({ otherUser, event, setCurrentEvent }) => {
  const { name, _id, date, image_url } = event;
  return (
    <div style={{ display: "flex", flexDirection: "row" }}>
      <div
        style={{
          alignItems: "flex-start",
          flex: 1
        }}
      >
        <text>{`You were invited by, `}</text>
        <div style={{ flexDirection: "row" }}>
          <NavLink to={`/home/profile?user_id=${otherUser._id}`}>
            {otherUser.username}
          </NavLink>
          <text>{` to the event ${name}`}</text>
        </div>
        <NavLink to={`/home/events?event_id=${_id}`} />
        <text style={{ color: Colors.Text }}>
          {capitalize(distanceFromTodayText(moment(date)))}
        </text>
      </div>
      <PostImage src={event.image_url + "?alt=media"} />
    </div>
  );
};

export default mobxConnect(({ authStore, eventsStore }) => ({
  setCurrentEvent: eventsStore.setCurrentEvent
}))(EventInvite);
