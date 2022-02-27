// HTTP request library
import axios from "axios";
// Constants
import {
  FETCH_USER,
  FETCH_USER_ERROR,
  FETCH_DATA,
  FETCH_DATA_ERROR,
  CREATE_MEDIA_SCRAPER,
  CREATE_MEDIA_SCRAPER_ERROR,
} from "./types";
import {
  GET_V1_CURRENT_USER,
  GET_V1_CURRENT_USER_DATA,
  CREATE_V1_MEDIA_SCRAPER,
} from "../constants";

/**
 * The fetch user action is resposible for calling backend API and
 * returning the current logged-in user details and dispatches the
 * reducer to store data in user reducer and provide data to conected
 * components.
 * @returns
 */
export const fetchUser = () => async (dispatch) => {
  try {
    const res = await axios.get(GET_V1_CURRENT_USER);
    dispatch({ type: FETCH_USER, payload: res.data });
  } catch (error) {
    dispatch({
      type: FETCH_USER_ERROR,
      payload: error || "Unable to fetch current user",
    });
  }
};

/**
 * The fetch user action is resposible for calling backend API and returs
 * the current logged-in user data and dispatches the reducer to store
 * data in user reducer and provide data to conected
 * components.
 * @returns
 */
export const fetchData = () => async (dispatch) => {
  try {
    const res = await axios.get(GET_V1_CURRENT_USER_DATA);
    dispatch({ type: FETCH_DATA, payload: res.data });
  } catch (error) {
    dispatch({
      type: FETCH_DATA_ERROR,
      payload: error || "Unable to fetch user data",
    });
  }
};

/**
 * The create scraper media action is resposible for calling backend API
 * and returs the current logged-in user media details and then dispatches
 * the reducer along with subsequent callback function.
 * @returns
 */
export const createScraperMedia =
  (websiteURL, userId, onSuccessCallback, onFailureCallback) =>
  async (dispatch) => {
    try {
      const data = {
        userId: userId,
        websiteURLs: [websiteURL],
      };
      const res = await axios.post(CREATE_V1_MEDIA_SCRAPER, data);
      dispatch({ type: CREATE_MEDIA_SCRAPER, payload: res.data });
      onSuccessCallback && onSuccessCallback();
    } catch (error) {
      dispatch({
        type: CREATE_MEDIA_SCRAPER_ERROR,
        payload: error || "Unable to create scraper media",
      });
      onFailureCallback && onFailureCallback();
    }
  };
