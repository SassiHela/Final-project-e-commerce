import React from "react";
import ReactDOM from "react-dom";
import "./bootstrap.min.css";
import "./App.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
//Redux
import { Provider } from "react-redux";
import store from "./store";
ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);
