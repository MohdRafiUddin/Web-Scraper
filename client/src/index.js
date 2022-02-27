// React, Redux
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
// Redux-Thunk
import reduxThunk from "redux-thunk";

// Internal CSS file
import "./index.css";
// External CSS file
import "materialize-css/dist/css/materialize.min.css";

// Internal Components
import App from "./components/App";
// Root Reducer
import reducers from "./reducers";

// Creats the store by passing redux-thuk middleware
const store = createStore(reducers, {}, applyMiddleware(reduxThunk));

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
