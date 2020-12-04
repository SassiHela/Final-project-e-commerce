import React from "react";
import ReactDOM from "react-dom";
import "./bootstrap.min.css";

import App from "./App";
import { BrowserRouter } from "react-router-dom";
//Redux
import { Provider } from "react-redux";
import store from "./redux/store";
ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
