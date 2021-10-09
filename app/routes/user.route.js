const { auth } = require("../middlewares");
const controller = require("../controllers/user.controller.js");

module.exports = app => {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "X-Access-Token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/user/:userID", controller.findByID);
  app.delete("/api/user/:userID", controller.remove);

  //app.get("/api/user/:userID/carts", controller.findCartByID);
  //app.get("/api/user/:userID/orders", controller.findOrderByID);
};