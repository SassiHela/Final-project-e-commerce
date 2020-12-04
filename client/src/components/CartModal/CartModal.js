import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCartUser, getCartItems } from "../../redux/actions/cartAction";
import ItemCard from "./ItemCard";
import { Result, Empty } from "antd";

const CartModal = () => {
  const user = useSelector((state) => state.auth);
  const userCart = useSelector((state) => state.cart);
  const cartDetails = useSelector((state) => state.cart.items);

  const dispatch = useDispatch();

  const [total, setTotal] = useState(0);

  const calculateTotal = (cartDetail) => {
    let total = 0;
    if (cartDetails) {
      cartDetails.map((item) => {
        return (total += item.price * item.quantity);
      });
      setTotal(total);
    }
  };

  useEffect(() => {
    if (!user.loading) {
      dispatch(getCartUser(user.user._id));

      if (!userCart.loading) {
        let cartItems = [];
        let qteProducts = userCart.cartDetails.products;
        if (qteProducts && qteProducts.length > 0) {
          qteProducts.forEach((item) => cartItems.push(item.productId));
        }
        //cartItems :  products id && qteProducts : productId and quantity
        dispatch(getCartItems(cartItems, qteProducts));
      }
    }
    calculateTotal(cartDetails);
  }, [dispatch, user.loading, userCart.loading, cartDetails]);

  return (
    <div style={{ width: "85%", margin: "3rem auto" }}>
      <h1>My Cart</h1>
      <ItemCard products={cartDetails} />
      <div style={{ marginTop: "3rem" }}>
        <h2>Total amount: $ {total}</h2>
      </div>
      <Result status="success" title="Successfully Purchased Items" />
      <div
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <br />
        <Empty description={false} />
        <p>No Items In the Cart</p>
      </div>
    </div>
  );
};

export default CartModal;
