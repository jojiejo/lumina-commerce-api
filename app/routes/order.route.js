const { auth } = require("../middlewares");
const controller = require("../controllers/order.controller.js");

module.exports = app => {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "X-Access-Token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post("/api/order", [auth.verifyToken], controller.create);
  app.get("/api/user/:userID/orders", controller.findByUserID);
};