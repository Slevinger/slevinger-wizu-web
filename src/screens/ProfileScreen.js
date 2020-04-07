import React, { useState, useEffect } from "react";
import { mobxConnect } from "../mobx/mobxConnect";
import { Page, Spacer } from "../components/StyledComponents";
import EmptyImage from "../assets/empty-image.png";
import styled from "styled-components";
import ProfileImageHeader from "../components/ProfileImageHeader";
import EditImageButton from "../components/EditImageButton";
import { LogoutButton } from "../components/StyledComponents";
import FriendsComponent from "../components/FriendsCompoent";
import { useLocation } from "react-router-dom";
import moment from "moment";

import "react-image-lightbox/style.css";

const formatPhoneNumber = phoneNumberString => {
  var cleaned = ("" + phoneNumberString).replace(/\D/g, "");
  var match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
  if (match) {
    return "(" + match[1] + ") " + match[2] + "-" + match[3];
  }
  return null;
};
const parsers = {
  phoneNumber: formatPhoneNumber,
  date: dateString => moment(dateString).format("dd, MMM, YYYY"),
  string: string => string
};
const getByPattern = (value, type = "string") => {
  return parsers[type](value);
};
const Attribute = ({ label, value, type, style }) => {
  return (
    <div
      style={{
        ...style,
        flexDirection: "column",
        marginLeft: "25px",
        marginRight: "25px"
      }}
    >
      <text style={{ marginRight: "15px", color: "gray" }}>{`${label}:`}</text>
      <text style={{ fontSize: 42, fontWeight: "bolder" }}>
        {getByPattern(value, type)}
      </text>
    </div>
  );
};

const ProfileImageContainer = styled.div`
  width: 260px;
  height: 260px;
  overflow: hidden;
  position: absolute;
  align-self: center;
  border-radius: 50%;
  margin-top: -130px;
  &:hover {
    cursor: pointer;
  }
`;
const ProfileImage = styled.img`
  width: 260px;
  height: 260px;
  &:hover {
    cursor: pointer;
  }
`;

const ProfileScreen = ({
  user_id,
  user,
  setMediaSource,
  updateProfileImage,
  logout,
  getUserDetails
}) => {
  const [displayUser, setDisplayUser] = useState(user);

  const { profileImage, username, phone, email, friends } = displayUser;

  useEffect(() => {
    const getOtherUser = async () => {
      const otherUser = await getUserDetails(user_id);
      setDisplayUser(otherUser);
    };
    if (user_id && user_id !== displayUser._id.toString()) {
      getOtherUser();
    }
    return () => {
      setDisplayUser(user);
    };
  }, [user_id]);

  return (
    <>
      <ProfileImageHeader hideEdit={user_id} user={displayUser} />

      <Page>
        <ProfileImageContainer>
          <ProfileImage
            onClick={() => setMediaSource(profileImage)}
            src={profileImage ? profileImage + "?alt=media" : EmptyImage}
          />
          {!user_id && (
            <EditImageButton
              left={"67%"}
              bottom={"14%"}
              fileSelected={file => {
                updateProfileImage(file);
              }}
            />
          )}
        </ProfileImageContainer>
        <div style={{ flexDirection: "column", display: "flex" }}>
          <Attribute label={"USERNAME"} value={username} />
          <Spacer />
          <div style={{ flexDirection: "row", display: "flex" }}>
            <Attribute
              label={"PHONE-NO"}
              value={phone}
              type={"phoneNumber"}
              style={{ flex: 1 }}
            />

            <Attribute label={"E-Mail"} value={email} />
          </div>
        </div>
        <FriendsComponent listOfFriends={friends} />
        <Spacer flex={1} />
        <LogoutButton variant="outlined" color="primary" onClick={logout}>
          logout
        </LogoutButton>
      </Page>
    </>
  );
};

export default mobxConnect(
  ({
    authStore: { user, logout },
    userStore: { updateProfileImage, getUserDetails },
    mediaStore: { setMediaSource }
  }) => {
    const location = useLocation();
    const match = location.search.match(/\?user_id=([^&]+)&?/);

    debugger;
    return {
      getUserDetails,
      user,
      logout,
      updateProfileImage,
      setMediaSource,
      user_id: match && match[1]
    };
  }
)(ProfileScreen);
