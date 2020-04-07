import React from "react";
import { StyledIconButton } from "../components/StyledComponents";
import { buildFileSelector } from "../utils";
import * as fontAwsomeIcons from "react-icons/fa";
const { FaCamera } = fontAwsomeIcons;
export default ({ fileSelected, left, bottom }) => {
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
