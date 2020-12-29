const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const productRoutes = require("./routes/productRoutes");
const userRoutes = require("./routes/userRoutes");
const orderRoutes = require("./routes/orderRoutes");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");
const asyncHandler = require("express-async-handler");
const path = require("path");

dotenv.config();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const app = express();

//Connect DB
connectDB();

//Init middleware
app.use(express.json({ extended: false }));

app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);

app.get("/api/config/stripe", (req, res) =>
  res.send(process.env.STRIPE_PUBLIC_KEY)
);

//Calculate prices
const addDecimals = (num) => {
  return Math.round(num * 100) / 100;
};

app.post(
  "/create-checkout-session",
  asyncHandler(async (req, res) => {
    const { orderItems, user, _id } = req.body;
    let success_url = "";
    let cancel_url = "";

    const items = orderItems.map((product) => {
      return {
        price_data: {
          currency: "usd",
          product_data: {
            name: product.name,
          },
          unit_amount: addDecimals(product.price * 100),
        },
        quantity: product.qty,
      };
    });

    if (process.env.NODE_ENV === "production") {
      success_url = `https://tunisierecyclage.herokuapp.com/order/${_id}/pay`;
      cancel_url = `https://tunisierecyclage.herokuapp.com/order/${_id}/cancel`;
    } else {
      success_url = `http://localhost:3000/order/${_id}/pay`;
      cancel_url = `http://localhost:3000/order/${_id}/cancel`;
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: items,
      mode: "payment",
      //success_url: `https://tunisierecyclage.herokuapp.com/order/${_id}?session_id={CHECKOUT_SESSION_ID}`,
      success_url: success_url,
      cancel_url: cancel_url,
      customer_email: user.email,
    });

    res.json({ id: session.id });
  })
);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/client/build")));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
  );
} else {
  app.get("/", (req, res) => res.send("Server is up and running"));
}

app.use(notFound);

app.use(errorHandler);

//Connection to server
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server running on localhost ${port}`);
});
