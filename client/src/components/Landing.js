// React
import React from "react";
// External Components
import styled from "styled-components";
// Constants
import { HOME_PAGE_LOGO_LINK } from "../constants";

const MainContainer = styled.div`
  flex: 1 1 auto;
  background-image: url(${HOME_PAGE_LOGO_LINK});
  background-size: cover;
`;

const Landing = () => <MainContainer />;

export default Landing;
