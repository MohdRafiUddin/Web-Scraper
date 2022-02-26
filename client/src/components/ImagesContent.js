import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import * as actions from "../actions";
import _ from "lodash";
import styled from "styled-components";
import paginate from "../utils/paginate";

const ImageText = styled.span`
  margin-bottom: 15px;
  font-size: 21px;
  font-weight: 200;
  margin: 0 0 10px;
  color: white;
`;

const ImagesConatiner = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const ThumbnailConatiner = styled.div`
  height: 40vh;
  flex-grow: 1;
  width: 100%;
  overflow: hidden;
  background-color: #000;
`;

const Image = styled.img`
  max-height: 100%;
  min-width: 100%;
  object-fit: cover;
  vertical-align: bottom;
  opacity: 0.7;
  width: 100%;
  height: auto;
  -webkit-transform: scale(1.15);
  -ms-transform: scale(1.15);
  transform: scale(1.15);
  -webkit-transition: -webkit-transform 0.5s, opacity 0.5s;
  transition: transform 0.5s, opacity 0.5s;
  &:hover {
    opacity: 1;
    -webkit-transform: scale(1.03);
    -ms-transform: scale(1.03);
    transform: scale(1.03);
  }
`;

const ImagesContent = (props) => {
  const [page, setPage] = useState(0);
  const [images, setImages] = useState([]);
  const { userData, isImagesDataLoaded } = props;
  const paginatedData = paginate(userData.imagesURLs);

  useEffect(() => {
    setImages(paginatedData[page]);
  }, [page, isImagesDataLoaded, userData]);

  const handlePage = (index) => setPage(index);

  const nextPage = () => {
    if (page === userData.length - 1) {
      setPage(0);
    } else {
      setPage(page + 1);
    }
  };

  const prevPage = () => {
    if (page === 0) {
      setPage(userData.length - 1);
    } else {
      setPage(page - 1);
    }
  };

  const renderImages = (imagesURLs) =>
    imagesURLs.map((imagesURLObject) => (
      <ImagesConatiner key={imagesURLObject.src} className="col-lg-4 col-sm-6">
        <ThumbnailConatiner className="thumbnail">
          <ImageText>{imagesURLObject.text}</ImageText>
          <Image src={imagesURLObject.src} alt={imagesURLObject.text} />
        </ThumbnailConatiner>
      </ImagesConatiner>
    ));
  return <div className="row">{renderImages(_.uniq(images))}</div>;
};

export default connect(null, actions)(ImagesContent);
