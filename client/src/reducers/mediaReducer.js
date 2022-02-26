import _ from 'lodash'
import { FETCH_MEDIA_SCRAPER } from '../actions/types.js'

export default function (state = {}, action) {
  switch (action.type) {
    case FETCH_MEDIA_SCRAPER:
      return action.payload.data || {};
    default:
      return state
  }
}
