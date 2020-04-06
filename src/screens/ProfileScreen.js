import React, { useState, useCallback } from "react";
import { mobxConnect } from "../mobx/mobxConnect";
import { Button } from "@material-ui/core";
import { Page } from "../components/StyledComponents";
import Lightbox from "react-image-lightbox";
import EmptyImage from "../assets/empty-image.png";
import styled from "styled-components";
import { FaCamera } from "react-icons/fa";
import { buildFileSelector } from "../utils";
import "react-image-lightbox/style.css";

const Attribute = ({ label, value }) => (
  <div style={{ flexDirection: "column", marginLeft: "25px" }}>
    <text style={{ marginRight: "15px", color: "gray" }}>{`${label}:`}</text>
    <text style={{ fontSize: 32, fontWeight: "bolder" }}>{value}</text>
  </div>
);

const TopImageContainer = styled.div`
  position: relative;
  flex-direction: column;
  display: flex;
  align-items: center;
`;
const TopImage = styled.img`
  object-fit: cover;
  width: 100%;
  height: 400px;
  background-color: #f7f7f7;
  &:hover {
    cursor: pointer;
  }
`;

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
const StyledIconButton = styled.div`
  background-color: gainsboro;
  border-radius: 12px;
  padding: 6px;
  &:hover {
    pointer: cursor;
    background-color: gray;
  }
`;
const EditImageButton = ({ fileSelected, left, bottom }) => {
  const selector = buildFileSelector(fileSelected);

  return (
    <StyledIconButton
      style={{ position: "absolute", left, bottom }}
      onClick={e => {
        selector.click();
      }}
    >
      <FaCamera size={32} />
    </StyledIconButton>
  );
};

const ImageHeader = ({
  profileImage,
  coverPhoto,
  updateProfileImage,
  setCoverPhoto,
  mediaSource,
  setMediaSource,
  hideMedia,
  ...rest
}) => {
  // const [isOpen,setIsOpen] = useState(false);

  return (
    <>
      {mediaSource && (
        <Lightbox
          mainSrc={mediaSource ? mediaSource + "?alt=media" : EmptyImage}
          onCloseRequest={() => {
            hideMedia();
          }}
        />
      )}
      <TopImageContainer>
        <TopImage
          {...rest}
          onClick={() => setMediaSource(coverPhoto)}
          src={coverPhoto ? coverPhoto + "?alt=media" : EmptyImage}
        />

        <EditImageButton
          left={"90%"}
          bottom={"13%"}
          fileSelected={file => {
            debugger;
            setCoverPhoto(file);
          }}
        />
      </TopImageContainer>
    </>
  );
};

const LogoutButton = styled(Button)`
  justify-self: center;
  align-self: center;
  position: relative;
  bottom: 35px;
`;

const ProfileImageHeader = mobxConnect(
  ({
    authStore: {
      user: { profileImage, coverPhoto }
    },
    userStore: { setCoverPhoto, updateProfileImage },
    mediaStore: { mediaSource, setMediaSource, hideMedia }
  }) => ({
    profileImage,
    coverPhoto,
    setCoverPhoto,
    updateProfileImage,
    mediaSource,
    setMediaSource,
    hideMedia
  })
)(ImageHeader);

const ProfileScreen = ({
  user,
  setMediaSource,
  updateProfileImage,
  logout
}) => {
  const { profileImage, username } = user;
  return (
    <>
      <ProfileImageHeader />

      <Page>
        <ProfileImageContainer>
          <ProfileImage
            onClick={() => setMediaSource(profileImage)}
            src={profileImage ? profileImage + "?alt=media" : EmptyImage}
          />
          <EditImageButton
            left={"67%"}
            bottom={"14%"}
            fileSelected={file => {
              debugger;
              updateProfileImage(file);
            }}
          />
        </ProfileImageContainer>
        <div style={{ flexDirection: "row", display: "flex", flex: 1 }}>
          <Attribute label={"username"} value={username} />
        </div>
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
    userStore: { updateProfileImage },
    mediaStore: { setMediaSource }
  }) => ({
    user,
    logout,
    updateProfileImage,
    setMediaSource
  })
)(ProfileScreen);
