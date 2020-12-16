const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const productRoutes = require("./routes/productRoutes");
const userRoutes = require("./routes/userRoutes");
const orderRoutes = require("./routes/orderRoutes");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");
const asyncHandler = require("express-async-handler");

dotenv.config();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const app = express();

//Connect DB
connectDB();

//Init middleware
app.use(express.json({ extended: false }));

app.get("/", (req, res) => res.send("Server is up and running"));

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
    console.log(items);

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: items,
      mode: "payment",
      success_url: `http://localhost:3000/order/${_id}?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: "http://localhost:3000/cancel",
      customer_email: user.email,
    });

    res.json({ id: session.id });
  })
);

app.use(notFound);

app.use(errorHandler);

//Connection to server
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server running on localhost ${port}`);
});
