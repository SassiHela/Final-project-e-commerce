import {
  ADD_TO_CART,
  GET_CART_ITEMS,
  NO_ITEMS_FOUND,
  GET_CART,
  NO_CART_FOUND,
} from "../actions/ActionsType";
const initialState = {
  cartDetails: null,
  items: null,
  loading: true,
};
export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case ADD_TO_CART:
    case GET_CART:
      return {
        ...state,
        cartDetails: payload,
        loading: false,
      };
    case GET_CART_ITEMS:
      return {
        ...state,
        items: payload,
        loading: false,
      };
    case NO_CART_FOUND:
    default:
      return state;
  }
}
