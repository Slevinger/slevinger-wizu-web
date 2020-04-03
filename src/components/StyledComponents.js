import React from "react";
import styled, { css } from "styled-components";
import { TextField as MaterialTextField } from "@material-ui/core";

export const TextField = styled(MaterialTextField)`
  margin: 10px;
`;

const SplitScreen = styled.div`
  flex: 1;
`;

const FlexDirection = styled.div`
  display: flex;
  ${({ horizontal }) =>
    horizontal &&
    css`
      flex-direction: horizontal;
    `}
`;

export const SplitContent = ({ children, horizontal }) => {
  debugger;
  return (
    <FlexDirection horizontal={horizontal}>
      {children.map(child => (
        <SplitScreen count={children.length}>{child}</SplitScreen>
      ))}
    </FlexDirection>
  );
};
