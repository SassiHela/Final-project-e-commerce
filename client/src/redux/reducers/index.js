import { combineReducers } from "redux";
import alert from "./alert";
import auth from "./auth";
import product from "./productReducer";
import cart from "./cartReducer";

export default combineReducers({ alert, auth, product, cart });
