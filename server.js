const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const corsOptions = {
  origin: "http://localhost:3000",
};

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.json({ message: "Welcome to my application." });
});

require("./app/routes/auth.route.js")(app);
require("./app/routes/user.route.js")(app);
require("./app/routes/item.route.js")(app);
require("./app/routes/cart.route.js")(app);
require("./app/routes/order.route.js")(app);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
