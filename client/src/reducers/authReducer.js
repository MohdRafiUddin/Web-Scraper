import { FETCH_USER, FETCH_USER_ERROR } from '../actions/types.js'

export default function (state = null, action) {
  switch (action.type) {
    case FETCH_USER:
      return action.payload || false
    case FETCH_USER_ERROR:
      return action.payload || false
    default:
      return state
  }
}
