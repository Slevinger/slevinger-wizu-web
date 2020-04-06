import React from "react";
import styled, { css } from "styled-components";
import { TextField as MaterialTextField } from "@material-ui/core";

const SplitScreen = styled.div`
  flex: 1;
`;

const FlexDirection = styled.div`
  display: flex;
  ${({ horizontal }) =>
    horizontal &&
    css`
      flex-direction: row;
    `}
`;

export const SplitContent = ({ children, horizontal }) => {
  return (
    <FlexDirection horizontal={horizontal}>
      {children.map(child => (
        <SplitScreen count={children.length}>{child}</SplitScreen>
      ))}
    </FlexDirection>
  );
};

export const RedBar = styled.div`
  padding: 5px;
  margin-top: 25px;
  background-color: rgba(239, 0, 0, 0.5);
  disaply: flex !important;
  color: white;
  flex-direction: row;
  padding-left: 50px;
  position: absolute;
  width: 100vw;
  padding-right: 50px;
  z-index: 9;
`;

export const Page = styled.div`
  flex-direction: column;
  display: flex;
  min-height: 720px;
  flex: 1;
  width: 100%;
`;

export const TextField = styled(MaterialTextField)`
  margin: 10px;
`;
