import axios from "axios";
import { PRODUCTS_LOADED, NO_PRODUCTS_FOUND } from "./ActionsType";

//Load products
export const loadProduct = (searchTerm) => async (dispatch) => {
  const config = { headers: { "Content-type": "application/json" } };
  const body = JSON.stringify({ searchTerm });
  try {
    const res = await axios.post("/products/getProducts", body, config);
    dispatch({
      type: PRODUCTS_LOADED,
      payload: res.data,
    });
  } catch (err) {
    console.error(err.message);
    dispatch({
      type: NO_PRODUCTS_FOUND,
    });
  }
};
