import React, { useEffect } from "react";
import Message from "../components/Message";
import { payOrder } from "../actions/orderAction";
import { useDispatch } from "react-redux";

const SuccessScreen = ({ match }) => {
  const dispatch = useDispatch();

  const orderId = match.params.id;

  useEffect(() => {
    dispatch(payOrder(orderId));
  }, [dispatch, orderId]);
  return (
    <Message variant="success">votre paiement a été traité avec succès</Message>
  );
};

export default SuccessScreen;
