import React from "react";
import styled, { css } from "styled-components";
import { TextField as MaterialTextField } from "@material-ui/core";
import { Button } from "@material-ui/core";
import { device } from "../const/Styles";

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
  position: fixed;
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

export const StyledIconButton = styled.div`
  background-color: gainsboro;
  border-radius: 12px;
  padding: 6px;
  &:hover {
    pointer: cursor;
    background-color: gray;
  }
`;
export const LogoutButton = styled(Button)`
  justify-self: center;
  align-self: center;
  position: relative;
  bottom: 35px;
`;

export const Spacer = styled.div`
  margin: 15px;
  ${props => {
    return css`
      ${Object.keys(props)
        .filter(propsKey => typeof props[propsKey] !== "object")
        .map(key => `${key}:${props[key]}`)
        .join(";")};
    `;
  }}
`;

export const ListImage = styled.img`
  width: 50px;
  height: 50px;
`;

export const Horizontal = styled.div`
  flex-direction: row;
  disaply: flex;
`;
