// React, Redux
import React, { Component } from "react";
import { connect } from "react-redux";
// External Utility library
import _ from "lodash";
// Actions
import * as actions from "../actions";
// External Components
import styled from "styled-components";
// Internal Components
import SearchBar from "./SearchBar";
import ImagesContent from "./ImagesContent";
// Constants
import {
  DASHBOARD_HEADER_CONTENT,
  DASHBOARD_HEADER_CONTENT_TEXT,
  DASHBOARD_WELCOME_TEXT,
  GALLERY_MEDIA_CLASSNAME,
} from "../constants";

const DashboardContainer = styled.div`
  margin: 20px;
  overflow: auto;
`;

const JumboTronContainer = styled.div`
  padding-right: 30px;
  padding-left: 30px;
  padding-top: 24px;
  padding-bottom: 24px;
  border-radius: 6px;
  margin-bottom: 48px;
  background-image: linear-gradient(to right, #ffecd2, #fcb69f);
  color: hsl(209, 61%, 16%);
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
`;

const JumboTronTitle = styled.h1`
  font-size: 63px;
  margin-top: 20px;
  margin-bottom: 10px;
  margin: 0.67em 0;
  color: inherit;
  font-family: inherit;
  font-weight: 500;
  line-height: 1.1;
`;

const NotFound = styled.h4`
  font-size: 63px;
  margin-top: 20px;
  margin-bottom: 10px;
  margin: 0.67em 0;
  color: inherit;
  font-family: inherit;
  font-weight: 500;
  line-height: 1.1;
`;

const Welcome = styled.h4`
  font-size: 63px;
  margin-top: 20px;
  margin-bottom: 10px;
  margin: 0.67em 0;
  color: inherit;
  font-family: inherit;
  font-weight: 500;
  line-height: 1.1;
`;

const JumboTronHeading = styled.p`
  margin-bottom: 15px;
  font-size: 21px;
  font-weight: 200;
  margin: 0 0 10px;
`;

const ImagesContainer = styled.div`
  display: flex;
  justify-content: center;
`;

/**
 * The Dashboard component will render the content when user visit /dashboard route
 */
class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      errorText: "",
    };
    this.updateLoadingState = this.updateLoadingState.bind(this);
    this.updateErrorTextState = this.updateErrorTextState.bind(this);
  }

  updateLoadingState = () => {
    this.setState((prevState) => {
      loading: !prevState.loading;
    });
  };

  updateErrorTextState = (errorText) => {
    this.setState({
      errorText: errorText,
    });
  };

  render() {
    const { userData } = this.props;
    const isImagesDataLoaded =
      userData !== null &&
      userData !== undefined &&
      !_.isEmpty(userData) &&
      userData.imagesURLs !== null &&
      userData.imagesURLs.length > 0;
    return (
      <DashboardContainer>
        <JumboTronContainer>
          <JumboTronTitle>
            <i className={GALLERY_MEDIA_CLASSNAME}></i> {DASHBOARD_HEADER_CONTENT}{" "}
          </JumboTronTitle>
          <JumboTronHeading>{DASHBOARD_HEADER_CONTENT_TEXT}</JumboTronHeading>
          <SearchBar
            updateParentLoadigState={this.updateLoadingState}
            updateParentErrorTextState={this.updateErrorTextState}
          />
        </JumboTronContainer>
        <ImagesContainer>
          <ImagesContent
            userData={userData}
            isImagesDataLoaded={isImagesDataLoaded}
          />
          {!isImagesDataLoaded &&
            (this.state.errorText ? (
              <NotFound>{this.state.errorText}</NotFound>
            ) : (
              <Welcome>{DASHBOARD_WELCOME_TEXT}</Welcome>
            ))}
        </ImagesContainer>
      </DashboardContainer>
    );
  }
}

const mapStateToProps = ({ userData, authentication }) => ({
  userData,
  authentication,
});

export default connect(mapStateToProps, actions)(Dashboard);
