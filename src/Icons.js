import styled, { css } from "styled-components";
import { device } from "./const/Styles";
import { FaCamera } from "react-icons/fa";

export const Camera = styled(FaCamera)`
  @media ${device.tablet} {
    height: 18px;
    width: 18px;
  }
  @media ${device.laptop} {
    height: 32px;
    width: 32px;
  }
`;
