import React, { useState } from "react";
import { Avatar } from "@material-ui/core";
import styled from "styled-components";

const FriendsContainer = styled.div`
  display: flex;
  flex-direction: row;
  padding: 10;
  flex-wrap: wrap;
  height: 200px;
`;

const FriendListItem = () => {};

export default ({ listOfFriends = [], style = {} }) => {

  const [currentIndex, setCurrentIndex] = useState(0);
  return (
    <FriendsContainer style={{ style }}>
      {listOfFriends.slice(currentIndex, 20).map(friend => (
        <Avatar src={friend.profileImage} />
      ))}
    </FriendsContainer>
  );
};
