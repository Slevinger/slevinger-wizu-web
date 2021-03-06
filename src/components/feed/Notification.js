import React, { useState, useEffect } from "react";
import styled from "styled-components";
import FriendReq from "./FriendReq";
import EventInvite from "./EventInvite";
import { Spacer } from "../StyledComponents";
import { mobxConnect } from "../../mobx/mobxConnect";
import { Post } from "./StyledFeedComponents";
const NoatificationFactory = ({ correspondence_type, ...item }) => {
  switch (correspondence_type) {
    case "RSVP":
      return <EventInvite {...item} />;
      break;
    case "FRIEND_REQ":
      return <FriendReq {...item} />;
      break;
    default:
      return null;
  }
};

const Noatification = ({
  getUserDetails,
  trigger_user_id,
  user_id,
  ...props
}) => {
  const [otherUser, setOtherUser] = useState(null);
  useEffect(() => {
    (async () => {
      let idToFetch =
        props.user._id.toString() === user_id ? trigger_user_id : user_id;
      // debugger;
      const user = await getUserDetails(idToFetch);
      setOtherUser(user);
    })();
  }, [user_id, trigger_user_id]);
  if (!otherUser) {
    return null;
  }
  return (
    <Post>
      <Spacer>
        <NoatificationFactory
          otherUser={otherUser}
          trigger_user_id={trigger_user_id}
          {...props}
        />
      </Spacer>
    </Post>
  );
};

const styles = {
  post: {
    shadowColor: "#000",
    borderWidth: 0,
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    minHeight: 100,
    marginBottom: 10
  }
};

export default mobxConnect(
  ({
    userStore: { confirmFriendRequest, ignoreFriendRequest, getUserDetails }
  }) => ({
    confirmFriendRequest,
    ignoreFriendRequest,
    getUserDetails
  })
)(Noatification);
