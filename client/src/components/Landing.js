// React
import React from "react";
// External Components
import styled from "styled-components";
// Constants
import {
  GALLERY_MEDIA_CLASSNAME,
  HOME_PAGE_LOGO_LINK,
  LANDING_HEADER_CONTENT,
  LANDING_HEADER_CONTENT_TEXT,
} from "../constants";

const MainContainer = styled.div`
  flex: 1 1 auto;
  background-image: url(${HOME_PAGE_LOGO_LINK});
  background-size: cover;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
  border-radius: 5px;
`;

const LandingTitle = styled.h1`
  font-size: 63px;
  margin: 0.5em;
  color: inherit;
  font-family: inherit;
  font-weight: 500;
  line-height: 1.1;
`;

const LandingHeading = styled.p`
  margin-left: 1.5em;
  font-size: 21px;
  font-weight: 200;
`;

const Landing = () => (
  <MainContainer>
    <LandingTitle>
      <i id="landing-title" className={GALLERY_MEDIA_CLASSNAME}></i>{" "}
      {LANDING_HEADER_CONTENT}{" "}
    </LandingTitle>
    <LandingHeading id="landing-heading">
      {LANDING_HEADER_CONTENT_TEXT}
    </LandingHeading>
  </MainContainer>
);

export default Landing;
