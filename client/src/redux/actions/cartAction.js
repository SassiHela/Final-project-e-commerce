import axios from "axios";
import {
  ADD_TO_CART,
  GET_CART_ITEMS,
  NO_ITEMS_FOUND,
  GET_CART,
  NO_CART_FOUND,
} from "../actions/ActionsType";

//ADD_TO_CART
// route /cart/addToCart?productId
export const addToCart = (productId) => async (dispatch) => {
  const config = { headers: { "Content-type": "application/json" } };
  const body = JSON.stringify({ productId });
  try {
    const res = await axios.post("/cart/addToCart", body, config);

    dispatch({
      type: ADD_TO_CART,
      payload: res.data,
    });
  } catch (err) {
    console.error(err.message);
  }
};

// route : cart/products_by_id?id=123,123,123
// get cart items
//cartItems :  products id && userCart : productId and quantity
export const getCartUser = (userId) => async (dispatch) => {
  try {
    const res = await axios.get(`/cart/cart_by_userId?id=${userId}`);
    dispatch({
      type: GET_CART,
      payload: res.data,
    });
  } catch (err) {
    console.error(err.message);
    dispatch({
      type: NO_CART_FOUND,
    });
  }
};

export const getCartItems = (cartItems, userCart) => async (dispatch) => {
  const config = { headers: { "Content-type": "application/json" } };
  const body = JSON.stringify({ cartItems });
  try {
    //products id +price +title+image
    let res = await axios.post(`/cart/products_by_id`, body, config);

    userCart.forEach((cartItem) => {
      res.data.forEach((product, i) => {
        if (cartItem.productId === product._id) {
          res.data[i].quantity = cartItem.quantity;
        }
      });
    });
    dispatch({
      type: GET_CART_ITEMS,
      payload: res.data,
    });
  } catch (err) {
    console.error(err.message);
    dispatch({
      type: NO_ITEMS_FOUND,
    });
  }
};
