import axios from "axios";
import { FETCH_USER, FETCH_DATA, FETCH_MEDIA_SCRAPER } from "./types";

export const fetchUser = () => async (dispatch) => {
  const res = await axios.get("api/current_user");
  dispatch({ type: FETCH_USER, payload: res.data });
};

export const fetchData = () => async (dispatch) => {
  const res = await axios.get("api/current_user/data");
  dispatch({ type: FETCH_DATA, payload: res.data });
};

export const createScraperMedia =
  (websiteURL, userId) => async (dispatch) => {
    const data = {
      userId: userId,
      websiteURLs: [websiteURL],
    };
    const res = await axios.post("api/v1/media-scraper", data);
    dispatch({ type: FETCH_MEDIA_SCRAPER, payload: res.data });
  };
