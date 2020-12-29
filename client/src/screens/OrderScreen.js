import React, { useEffect } from "react";
import { Row, Col, ListGroup, Image, Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { getOrderDetails, payOrder } from "../actions/orderAction";
import axios from "axios";
import { loadStripe } from "@stripe/stripe-js";
import { ORDER_PAY_RESET } from "../constants/orderConstants";

const stripePromise = loadStripe(
  "pk_test_51HpzXbDAmERAuXVO6xDI2PYWhySNN2czMLGbklM3qVzwmUw7uaynq3BcZU4d72rZqNmEBLcp0CGXifH2m2IZU05v00g2q0gP5x"
);

const OrderScreen = ({ match, history }) => {
  const dispatch = useDispatch();

  const orderId = match.params.id;

  const orderDetails = useSelector((state) => state.orderDetails);
  const { order, loading, error } = orderDetails;

  const orderPay = useSelector((state) => state.orderPay);
  const { loading: loadingPay, success: successPay } = orderPay;

  //Calculate prices
  const addDecimals = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2);
  };
  if (order && !loading) {
    order.itemsPrice = addDecimals(
      order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0)
    );
  }

  useEffect(() => {
    if (!order || successPay || order._id !== orderId) {
      dispatch({ type: ORDER_PAY_RESET });

      dispatch(getOrderDetails(orderId));
    }
  }, [dispatch, order, orderId, successPay]);

  const successPayementHandler = async (event) => {
    // Get Stripe.js instance
    const stripe = await stripePromise;

    // Call your backend to create the Checkout Session
    const { data } = await axios.post("/create-checkout-session", order);

    const session = data;

    // When the customer clicks on the button, redirect them to Checkout.
    const result = await stripe.redirectToCheckout({
      sessionId: session.id,
    });

    if (result.error) {
      // If `redirectToCheckout` fails due to a browser or network
      // error, display the localized error message to your customer
      // using `result.error.message`.
    }
  };

  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant="danger">{error}</Message>
  ) : (
    <>
      <h1>Commande {order._id}</h1>
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Détails de livraison</h2>
              <p>
                <strong>Nom de l'utilsateur : </strong>
                {order.user.name}
              </p>
              <p>
                <strong>Email : </strong>
                <a href={`mailto:${order.user.email}`}>{order.user.email}</a>
              </p>
              <p>
                <strong>Adresse : </strong>
                {order.shippingAddress.address},{order.shippingAddress.city}{" "}
                {order.shippingAddress.postalCode},
                {order.shippingAddress.country}
              </p>
              {order.isDelivered ? (
                <Message variant="success">
                  Delivré le {order.deliveredAt}
                </Message>
              ) : (
                <Message variant="danger">Non Delivré</Message>
              )}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Methode de paiement</h2>
              <p>
                <strong>Methode : </strong>
                {order.paymentMethod}
              </p>
              {/* {order.isPaid ? (
                <Message variant="success">Payé le {order.paidAt}</Message>
              ) : (
                <Message variant="danger">Non Payé</Message>
              )} */}
              <Message variant="danger">Non Payé</Message>
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Panier</h2>
              {order.orderItems.length === 0 ? (
                <Message>Panier vide</Message>
              ) : (
                <ListGroup variant="flush">
                  {order.orderItems.map((item, index) => (
                    <ListGroup.Item key={index}>
                      <Row>
                        <Col md={1}>
                          <Image
                            src={item.image}
                            alt={item.name}
                            fluid
                            rounded
                          />
                        </Col>
                        <Col>
                          <Link to={`/product/${item.product}`}>
                            {item.name}
                          </Link>
                        </Col>
                        <Col md={4}>
                          {item.qty} x ${item.price} = ${item.qty * item.price}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>

        <Col md={4}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h2>récapitulatif</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Produits</Col>
                  <Col>${order.itemsPrice}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Frais de livraison</Col>
                  <Col>${addDecimals(order.shippingPrice)}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Taxe</Col>
                  <Col>${addDecimals(order.taxPrice)}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Totale</Col>
                  <Col>${addDecimals(order.totalPrice)}</Col>
                </Row>
              </ListGroup.Item>
              {!order.isPaid && (
                <ListGroup.Item>
                  {loadingPay && <Loader />}
                  <Button
                    type="button"
                    className="btn-block"
                    id="checkout-button"
                    onClick={successPayementHandler}
                    role="link"
                  >
                    Payer
                  </Button>
                </ListGroup.Item>
              )}
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default OrderScreen;
