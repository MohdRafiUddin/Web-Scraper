// React, Redux
import React, { useState } from "react";
import { connect } from "react-redux";
// Actions
import * as actions from "../actions";
// External Components
import styled, { keyframes } from "styled-components";
// Constants
import {
  BTN_BTN_SECONDARY_CLASSNAME,
  EMPTY_STRING,
  FORM_CONTROL_CLASSNAME,
  INPUT_GROUP_BTN_CLASSNAME,
  INPUT_GROUP_CLASSNAME,
  SEARCH_BAR_ERROR_TEXT,
  SEARCH_BAR_INPUT_FIELD,
  SUBMIT,
  UPPER_SUBMIT,
  URL,
} from "../constants";

const SubmitButtonWrapper = styled.span`
  padding-left: 10px;
`;

const spinnerAnimation = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
 `;

const Loader = styled.div`
  margin-top: 15px;
  margin-right: 15px;
  border: 5px solid white;
  border-radius: 50%;
  border-top: 5px solid gray;
  border-left: 5px solid gray;
  width: 25px;
  height: 25px;
  animation: ${spinnerAnimation} 1s linear infinite;
`;

const SearchBar = (props) => {
  const [websiteURL, setWebsiteURL] = useState(EMPTY_STRING);
  const [loading, setLoading] = useState(false);

  const onInputChange = (event) => setWebsiteURL(event.target.value);

  const performStateUpdate = () => {
    props.fetchData();
    setWebsiteURL(EMPTY_STRING);
    setLoading(false);
    props.updateParentLoadigState();
  };

  const onFormSubmit = (event) => {
    event.preventDefault();
    setLoading(true);
    props.updateParentLoadigState();
    props.createScraperMedia(
      websiteURL,
      props.authentication.userId,
      () => {
        performStateUpdate();
      },
      () => {
        performStateUpdate();
        props.updateParentErrorTextState(SEARCH_BAR_ERROR_TEXT);
      }
    );
  };

  return (
    <form onSubmit={onFormSubmit} className={INPUT_GROUP_CLASSNAME}>
      <input
        type={URL}
        placeholder={SEARCH_BAR_INPUT_FIELD}
        className={FORM_CONTROL_CLASSNAME}
        value={websiteURL}
        onChange={onInputChange}
        required={true}
      />
      <SubmitButtonWrapper className={INPUT_GROUP_BTN_CLASSNAME}>
        {loading ? (
          <Loader />
        ) : (
          <button type={SUBMIT} className={BTN_BTN_SECONDARY_CLASSNAME}>
            {UPPER_SUBMIT}
          </button>
        )}
      </SubmitButtonWrapper>
    </form>
  );
};

const mapStateToProps = ({ userData, authentication }) => ({
  userData,
  authentication,
});

export default connect(mapStateToProps, actions)(SearchBar);
