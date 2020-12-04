import { PRODUCTS_LOADED, NO_PRODUCTS_FOUND } from "../actions/ActionsType";

const initialState = {
  products: [],
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case PRODUCTS_LOADED:
      return {
        ...state,
        products: payload,
      };

    case NO_PRODUCTS_FOUND:
    default:
      return state;
  }
}
