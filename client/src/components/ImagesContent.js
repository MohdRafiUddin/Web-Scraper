import React from "react";
import { connect } from "react-redux";
import * as actions from "../actions";
import _ from "lodash";
import styled from "styled-components";

const ImagesContent = (props) => {
  const { data } = props;
  if (data === null || _.isEmpty(data) || data.imagesURLs === null) {
    return null;
  }
  const renderImages = (imagesURLs) =>
    imagesURLs.map((imagesURL) => (
      <div key={imagesURL} className="col-lg-4 col-sm-6">
        <div className="thumbnail">
          <img src={imagesURL} />
        </div>
      </div>
    ));
  return <div className="row">{renderImages(_.uniq(data.imagesURLs))}</div>;
};

const mapStateToProps = ({ data, auth }) => ({ data, auth });

export default connect(mapStateToProps, actions)(ImagesContent);
