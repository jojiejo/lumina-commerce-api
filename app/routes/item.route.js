const { auth } = require("../middlewares");
const controller = require("../controllers/item.controller.js");

module.exports = app => {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "X-Access-Token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post("/api/item", [auth.verifyToken], controller.create);
  app.get("/api/items", controller.findAll);
  app.get("/api/item/:itemID", controller.findByID);
  app.delete("/api/item/:itemID", controller.remove);
};