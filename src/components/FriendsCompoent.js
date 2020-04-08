import React, { useState } from "react";
import { Avatar } from "@material-ui/core";
import styled from "styled-components";

const FriendsContainer = styled.div`
  display: flex;
  flex-direction: row;
  padding: 25px;
  flex-wrap: wrap;
  height: 200px;
`;

const FriendListItem = () => {};

export default ({ listOfFriends = [], style = {} }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  debugger;

  return (
    <FriendsContainer style={{ style }}>
      {listOfFriends.slice(currentIndex, 20).map(friend => (
        <Avatar
          style={{ width: 100, height: 100 }}
          src={friend.profileImage && friend.profileImage + "?alt=media"}
        />
      ))}
    </FriendsContainer>
  );
};
