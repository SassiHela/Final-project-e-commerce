import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadProduct } from "../../redux/actions/productAction";
import { addToCart } from "../../redux/actions/cartAction";
import "antd/dist/antd.css";

import { Col, Card, Row, Input, Button } from "antd";
const { Search } = Input;
const { Meta } = Card;

const Dashboard = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.product.products);

  const [SearchTerm, setSearchTerm] = useState("");

  const changeHundler = (event) => {
    setSearchTerm(event.target.value);
  };

  useEffect(() => {
    dispatch(loadProduct(SearchTerm));
  }, [dispatch, SearchTerm]);
  return (
    <div style={{ width: "75%", margin: "3rem auto" }}>
      <div style={{ textAlign: "center" }}>{/* <h2></h2> */}</div>

      {/* Search */}

      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          margin: "1rem auto",
        }}
      >
        <div>
          <Search
            value={SearchTerm}
            onChange={(e) => changeHundler(e)}
            placeholder="Search ..."
          />
        </div>
      </div>

      {products.length === 0 ? (
        <div
          style={{
            display: "flex",
            height: "300px",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <h2>No products...</h2>
        </div>
      ) : (
        <div>
          <Row gutter={[16, 16]}>
            {products.map((product) => (
              <Col lg={6} md={8} xs={24} key={product._id}>
                <Card
                  hoverable={true}
                  cover={
                    <img
                      style={{ width: "100%", maxHeight: "150px" }}
                      src={product.image}
                      alt="productImage"
                    />
                  }
                >
                  <Meta
                    title={product.title}
                    description={`$${product.price}`}
                  />
                  <br></br>
                  <div style={{ display: "flex", justifyContent: "center" }}>
                    <Button
                      size="large"
                      shape="round"
                      type="danger"
                      onClick={() => {
                        dispatch(addToCart(product._id));
                      }}
                    >
                      Add to Cart
                    </Button>
                  </div>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      )}
    </div>
  );
};
export default Dashboard;
