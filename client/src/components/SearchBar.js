import React, { useState } from "react";
import * as actions from "../actions";
import { connect } from "react-redux";
import styled from "styled-components";

const SubmitButtonWrapper = styled.span`
  padding-left: 10px;
`;

const SearchBar = (props) => {
    console.log(props)
  const [websiteURL, setWebsiteURL] = useState("");
  const [errorText, setErrorText] = useState("");

  const onInputChange = (event) => setWebsiteURL(event.target.value);

  const onFormSubmit = (event) => {
    event.preventDefault();
    props.createScraperMedia(websiteURL, props.auth.userId);
    setWebsiteURL("");
  };

  return (
    <form onSubmit={onFormSubmit} className="input-group">
      <input
        type="url"
        placeholder="Input the website URL (http://www.example.com) to fetch the website media (Images, Videos) etc"
        className="form-control"
        value={websiteURL}
        onChange={onInputChange}
        required={true}
      />
      <SubmitButtonWrapper className="input-group-btn">
        <button type="submit" className="btn btn-secondary">
          Submit
        </button>
      </SubmitButtonWrapper>
    </form>
  );
};

const mapStateToProps = ({ data, auth }) => ({ data, auth });

export default connect(mapStateToProps, actions)(SearchBar);
