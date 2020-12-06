const bcrypt = require("bcryptjs");
const users = [
  {
    name: "Hela",
    email: "hela.sassi13@gmail.com",
    password: bcrypt.hashSync("123", 10),
  },
  {
    name: "example",
    email: "example@gmail.com",
    password: bcrypt.hashSync("123", 10),
  },
];

module.exports = users;
