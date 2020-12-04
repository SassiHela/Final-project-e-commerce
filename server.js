const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const products = require("./data/products");

dotenv.config();
const app = express();

// const session = require("express-session");
// const MongoStore = require("connect-mongo")(session);
// const mongoose = require("mongoose");

//Connect DB
connectDB();

//Init middleware
app.use(express.json({ extended: false }));
// app.use(
//   session({
//     secret: "foo",
//     // Forces the session to be saved
//     // back to the session store
//     resave: true,

//     // Forces a session that is "uninitialized"
//     // to be saved to the store
//     saveUninitialized: true,
//     store: new MongoStore({ mongooseConnection: mongoose.connection }),
//     cookie: {
//       maxAge: 180 * 60 * 1000, // 3hours
//     },
//   })
// );

app.get("/", (req, res) => res.send("Server is up and running"));
app.get("/api/products", (req, res) => res.json(products));
app.get("/api/products/:id", (req, res) => {
  const product = products.find((product) => product._id === req.params.id);
  res.json(product);
});

//Connection to server
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server running on localhost ${port}`);
});
