import styled from "styled-components";

export const ButtonGroupContainer = styled.div`
  border-color: red;
  border-width: 0px;
  width: 200px;
  justify-content: flex-end;
  align-items: flex-end;
  flex-direction: row;
  margin-top: 10px;
`;

export const PostImage = styled.img`
  width: 120px;
  height: 120px;
`;

export const PostBottomRow = styled.div`
  flex: 1;
  flex-direction: row;
  display: flex;
  border-color: red;
`;

export const Post = styled.div`
  width: 60%;
  align-self: center;
  box-shadow: 0 3px 5px 2px rgba(255, 105, 135, 0.3);
  margin-bottom: 10px;
`;

export const PostContent = styled.div`
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  flex: 1;
  font-size: 28px;
`;
