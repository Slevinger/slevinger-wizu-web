import React from "react";
import { StyledIconButton } from "../components/StyledComponents";
import { Camera } from "../Icons";
import { buildFileSelector } from "../utils";

export default ({ fileSelected, left, bottom }) => {
  const selector = buildFileSelector(fileSelected);
  debugger;
  return (
    <StyledIconButton
      style={{ position: "absolute", left, bottom }}
      onClick={e => {
        selector.click();
      }}
    >
      <Camera />
    </StyledIconButton>
  );
};
