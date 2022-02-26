import { combineReducers } from 'redux'
import authReducer from './authReducer'
import dataReducer from './dataReducer'
import mediaReducer from './mediaReducer'

const rootReducer = combineReducers({
  authentication: authReducer,
  userData: dataReducer,
  userMedia: mediaReducer,
})

export default rootReducer
