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
  app.get("/api/items", [auth.verifyToken], controller.findAll);
  app.get("/api/item/:itemID", [auth.verifyToken], controller.findByID);
  app.delete("/api/item/:itemID", [auth.verifyToken], controller.remove);
};