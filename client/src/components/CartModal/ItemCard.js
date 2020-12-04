import React from "react";
import "./ItemCard.css";
const ItemCard = ({ products }) => {
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Product Image</th>
            <th>Product Quantity</th>
            <th>Product Price</th>
            <th>Remove from Cart</th>
          </tr>
        </thead>
        <tbody>
          {products
            ? products.map((product) => (
                <tr key={product._id}>
                  <td>
                    <img
                      style={{ width: "70px" }}
                      alt="product"
                      src={product.image}
                    />
                  </td>
                  <td>{product.quantity} </td>
                  <td>$ {product.price} </td>
                  <td>
                    <button
                    //onClick={()=> props.removeItem(product._id)}
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))
            : null}
        </tbody>
      </table>
    </div>
  );
};
export default ItemCard;
