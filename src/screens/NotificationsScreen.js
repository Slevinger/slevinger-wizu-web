import React from "react";
import { mobxConnect } from "../mobx/mobxConnect";
import { Page, Spacer } from "../components/StyledComponents";
import Notification from "../components/feed/Notification";

const filterRsvps = correspondence => {
  const { correspondence_type, trigger_user_id, user_id } = correspondence;
  console.log(
    `correspondence_type:(${correspondence_type}) !== "RSVP" => ${correspondence_type !==
      "RSVP"} || trigger_user_id:(${trigger_user_id}) !== user_id:(${user_id}) => ${trigger_user_id !==
      user_id}`
  );
  return correspondence_type !== "RSVP" || trigger_user_id !== user_id;
};

const NotificationsScreen = ({ user }) => {
  const { correspondences, email } = user;

  const array = Object.values(correspondences).filter(filterRsvps);
  return (
    <Page>
      <div
        style={{ marginTop: "100px", display: "flex", flexDirection: "column" }}
      >
        <text style={{ fontSize: 48 }}>Noatifications </text>
        {array
          .sort((a, b) => b.date - a.date > 0)
          .map(item => {
            return <Notification key={item._id} user={user} {...item} />;
          })}
      </div>
    </Page>
  );
};

export default mobxConnect(({ authStore: { user } }) => ({ user }))(
  NotificationsScreen
);
