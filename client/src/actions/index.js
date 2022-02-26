import axios from 'axios'
import {
  FETCH_USER,
  FETCH_USER_ERROR,
  FETCH_DATA,
  FETCH_DATA_ERROR,
  CREATE_MEDIA_SCRAPER,
  CREATE_MEDIA_SCRAPER_ERROR,
} from './types'

export const fetchUser = () => async (dispatch) => {
  try {
    const res = await axios.get('api/v1/current_user')
    dispatch({ type: FETCH_USER, payload: res.data })
  } catch (error) {
    dispatch({ type: FETCH_USER_ERROR, payload: error || 'Unable to fetch current user' })
  }
}

export const fetchData = () => async (dispatch) => {
  try {
    const res = await axios.get('api/v1/current_user/data')
    dispatch({ type: FETCH_DATA, payload: res.data })
  } catch (error) {
    dispatch({ type: FETCH_DATA_ERROR, payload: error || 'Unable to fetch user data' })
  }
}

export const createScraperMedia = (websiteURL, userId) => async (dispatch) => {
  try {
    const data = {
      userId: userId,
      websiteURLs: [websiteURL],
    }
    const res = await axios.post('api/v1/media-scraper', data)
    dispatch({ type: CREATE_MEDIA_SCRAPER, payload: res.data })
  } catch (error) {
    dispatch({ type: CREATE_MEDIA_SCRAPER_ERROR, payload: error || 'Unable to create scraper media' })
  }
}
