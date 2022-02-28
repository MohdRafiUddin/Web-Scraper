// React, Redux
import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
// Actions
import * as actions from "../actions";
// External Utility library
import _ from "lodash";
// External Components
import styled from "styled-components";
// Internal Utility library
import paginate from "../utils/paginate";
// Constants
import {
  EMPTY_STRING,
  FORM_CONTROL_CLASSNAME,
  IMAGE_CONTENT_SEARCH_FIELD,
  IMAGE_THUMBNAIL_CLASSNAME,
  NEXT,
  PREVIOUS,
  SEARCH,
  SEARCH_INPUT_FIELD_ID,
  THUMBNAIL_CLASSNAME,
  UPPER_SEARCH,
} from "../constants";

const MainContainerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  ${({ isActive }) =>
    isActive &&
    `
    width: 100%;
  `}
`;

const MainContainer = styled.div`
  margin-bottom: 20px;
`;

const SearchFormContainer = styled.div`
  display: flex;
  margin: 5px 20px 30px 20px;
  width: 25%;
  align-self: flex-end;
`;

const SearchImages = styled.input`
  font-size: 24px;
  padding: 10px;
  margin: 10px;
  background: grey;
  border: none;
  border-radius: 3px;
  ::placeholder {
    color: grey;
  }
`;

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

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  @media screen and (min-width: 775px) {
    margin: 0 auto;
  }
  ${({ isActive }) =>
    !isActive &&
    `
    display: none;
  `}
`;

const PaginateButton = styled.button`
  padding: 0.35rem 0.75rem;
  border-radius: 0.75rem;
  transition: all 0.3s linear;
  background: transparent;
  border-color: transparent;
  font-weight: bold;
  text-transform: capitalize;
  letter-spacing: 0.1rem;
  margin: 0.5rem;
  font-size: 1rem;
  color: rgb(100, 100, 100);
  cursor: pointer;
  &:hover {
    background-color: #fcb69f;
  }
`;

const PaginationButton = styled.button`
  width: 2rem;
  height: 2rem;
  background: #c48d7b;
  border-color: transparent;
  border-radius: 50%;
  cursor: pointer;
  margin: 0.5rem;
  transition: all 0.3s linear;
  ${(props) =>
    props.isActive && {
      background: "#c0775f",
      color: "white",
    }}
`;

const ImagesContent = (props) => {
  const [page, setPage] = useState(0);
  const [images, setImages] = useState([]);
  const [searchText, setSearchText] = useState(EMPTY_STRING);
  const { userData, isImagesDataLoaded } = props;
  const paginatedData = paginate(userData.imagesURLs);

  useEffect(() => {
    setImages(paginatedData[page]);
  }, [page, isImagesDataLoaded, userData]);

  const onInputChange = (event) => setSearchText(event.target.value);

  const handlePage = (index) => setPage(index);

  const nextPage = () => {
    if (page === paginatedData.length - 1) {
      setPage(0);
    } else {
      setPage(page + 1);
    }
  };

  const prevPage = () => {
    if (page === 0) {
      setPage(paginatedData.length - 1);
    } else {
      setPage(page - 1);
    }
  };

  const filterImages = searchText
    ? _.uniq(
        images.filter(({ text }) =>
          _.includes(_.lowerCase(text), _.lowerCase(searchText))
        )
      )
    : _.uniq(images);

  const renderImages = (imagesURLs) =>
    imagesURLs.map((imagesURLObject, index) => (
      <ImagesConatiner
        key={imagesURLObject.src + imagesURLObject.text + index}
        className={IMAGE_THUMBNAIL_CLASSNAME}
      >
        <ThumbnailConatiner className={THUMBNAIL_CLASSNAME}>
          <ImageText>{imagesURLObject.text}</ImageText>
          <Image src={imagesURLObject.src} alt={imagesURLObject.text} />
        </ThumbnailConatiner>
      </ImagesConatiner>
    ));
  return (
    <MainContainerWrapper isActive={isImagesDataLoaded}>
      {isImagesDataLoaded ? (
        <SearchFormContainer>
          <SearchImages
            type={SEARCH}
            id={SEARCH_INPUT_FIELD_ID}
            className={FORM_CONTROL_CLASSNAME}
            placeholder={IMAGE_CONTENT_SEARCH_FIELD}
            onChange={onInputChange}
            aria-label={UPPER_SEARCH}
          />
        </SearchFormContainer>
      ) : null}
      <MainContainer>{renderImages(filterImages)}</MainContainer>
      <ButtonContainer isActive={filterImages && filterImages.length > 0}>
        {isImagesDataLoaded ? (
          <PaginateButton onClick={() => prevPage()}>{PREVIOUS}</PaginateButton>
        ) : null}
        {!isImagesDataLoaded
          ? null
          : paginatedData.map((item, index) => (
              <PaginationButton
                key={index}
                isActive={index === page}
                onClick={() => handlePage(index)}
              >
                {index + 1}
              </PaginationButton>
            ))}
        {isImagesDataLoaded ? (
          <PaginateButton onClick={() => nextPage()}>{NEXT}</PaginateButton>
        ) : null}
      </ButtonContainer>
    </MainContainerWrapper>
  );
};

export default connect(null, actions)(ImagesContent);
