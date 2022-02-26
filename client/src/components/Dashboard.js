import React, { Component } from "react";
import { connect } from "react-redux";
import _ from "lodash";
import * as actions from "../actions";
import styled from "styled-components";
import SearchBar from "./SearchBar";
import ImagesContent from "./ImagesContent";

const DashboardContainer = styled.div`
  margin: 10px 100px;
  overflow: auto;
`;

const JumboTronContainer = styled.div`
  padding-right: 30px;
  padding-left: 30px;
  padding-top: 24px;
  padding-bottom: 24px;
  border-radius: 6px;
  margin-bottom: 48px;
  color: #2c3e50;
  background: #ecf0f1;
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

const JumboTronHeading = styled.p`
  margin-bottom: 15px;
  font-size: 21px;
  font-weight: 200;
  margin: 0 0 10px;
`;

const SearchBarContainer = styled.div``;

const ImagesContainer = styled.div``;

class Dashboard extends Component {
  render() {
    return (
      <DashboardContainer>
        <JumboTronContainer>
          <JumboTronTitle>
            <i className="fa fa-camera-retro"></i> Web Scraper Media Gallery{" "}
          </JumboTronTitle>
          <JumboTronHeading>
            Please provide sample website URL in the below input field to get a
            bunch of beautiful images that I didn't take (except for the first
            one!)
          </JumboTronHeading>
        </JumboTronContainer>
        <SearchBarContainer>
          <SearchBar />
        </SearchBarContainer>
        <ImagesContainer>
          <ImagesContent />
        </ImagesContainer>
      </DashboardContainer>
    );
  }
}
const mapStateToProps = ({ data, auth }) => ({ data, auth });

export default connect(mapStateToProps, actions)(Dashboard);
