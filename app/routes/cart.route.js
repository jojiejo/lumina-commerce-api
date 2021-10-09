const { auth } = require("../middlewares");
const controller = require("../controllers/cart.controller.js");

module.exports = app => {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "X-Access-Token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post("/api/cart", [auth.verifyToken], controller.create);
  app.delete("/api/cart/:cartID", [auth.verifyToken], controller.remove);
  app.put("/api/cart/:cartID", [auth.verifyToken], controller.updateQuantity);

  app.get("/api/user/:userID/carts", controller.findByUserID);
};