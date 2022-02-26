import _ from 'lodash'
import {
  CREATE_MEDIA_SCRAPER,
  CREATE_MEDIA_SCRAPER_ERROR,
} from '../actions/types.js'

export default function (state = {}, action) {
  switch (action.type) {
    case CREATE_MEDIA_SCRAPER:
      return action.payload.data || {}
    case CREATE_MEDIA_SCRAPER_ERROR:
      return action.payload || {}
    default:
      return state
  }
}
