import _ from "lodash";
import { FETCH_DATA, FETCH_DATA_ERROR } from "../actions/types.js";

export default function (state = {}, action) {
  switch (action.type) {
    case FETCH_DATA:
      return action.payload.data;
    case FETCH_DATA_ERROR:
      return action.payload;
    default:
      return state;
  }
}
