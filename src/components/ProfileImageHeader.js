import React from "react";
import { mobxConnect } from "../mobx/mobxConnect";

import Lightbox from "react-image-lightbox";
import EmptyImage from "../assets/empty-image.png";
import styled from "styled-components";
import EditImageButton from "./EditImageButton";

import "react-image-lightbox/style.css";

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

const ImageHeader = ({
  user: { coverPhoto },
  setCoverPhoto,
  mediaSource,
  setMediaSource,
  hideMedia,
  hideEdit,
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

        {!hideEdit && (
          <EditImageButton
            left={"90%"}
            bottom={"13%"}
            fileSelected={file => {
              setCoverPhoto(file);
            }}
          />
        )}
      </TopImageContainer>
    </>
  );
};

export default mobxConnect(
  ({
    userStore: { setCoverPhoto },
    mediaStore: { mediaSource, setMediaSource, hideMedia }
  }) => ({
    setCoverPhoto,
    mediaSource,
    setMediaSource,
    hideMedia
  })
)(ImageHeader);
