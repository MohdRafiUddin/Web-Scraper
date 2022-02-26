import { combineReducers } from "redux";
import authReducer from "./authReducer";
import dataReducer from "./dataReducer";
import mediaReducer from "./mediaReducer";

const rootReducer = combineReducers({
  auth: authReducer,
  data: dataReducer,
  media: mediaReducer,
});

export default rootReducer;
