import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import * as actions from "../actions";
import _ from "lodash";
import styled from "styled-components";
import paginate from "../utils/paginate";

const MainContainerWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const MainContainer = styled.div`
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 20px;
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
  const { userData, isImagesDataLoaded } = props;
  const paginatedData = paginate(userData.imagesURLs);

  useEffect(() => {
    setImages(paginatedData[page]);
  }, [page, isImagesDataLoaded, userData]);

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

  const renderImages = (imagesURLs) =>
    imagesURLs.map((imagesURLObject) => (
      <ImagesConatiner key={imagesURLObject.src} className="col-lg-4 col-sm-6">
        <ThumbnailConatiner className="thumbnail">
          <ImageText>{imagesURLObject.text}</ImageText>
          <Image src={imagesURLObject.src} alt={imagesURLObject.text} />
        </ThumbnailConatiner>
      </ImagesConatiner>
    ));
  return (
    <MainContainerWrapper>
      <MainContainer>{renderImages(_.uniq(images))}</MainContainer>
      <ButtonContainer>
        {isImagesDataLoaded ? (
          <PaginateButton onClick={() => prevPage()}>"Previous"</PaginateButton>
        ) : null}
        {!isImagesDataLoaded
          ? null
          : paginatedData.map((item, index) => {
              return (
                <PaginationButton
                  key={index}
                  isActive={index === page}
                  className={`page-btn ${index === page ? "active-btn" : null}`}
                  onClick={() => {
                    handlePage(index);
                  }}
                >
                  {index + 1}
                </PaginationButton>
              );
            })}
        {isImagesDataLoaded ? (
          <PaginateButton onClick={() => nextPage()}>"Next"</PaginateButton>
        ) : null}
      </ButtonContainer>
    </MainContainerWrapper>
  );
};

export default connect(null, actions)(ImagesContent);
