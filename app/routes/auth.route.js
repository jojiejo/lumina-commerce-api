const auths = require("../controllers/auth.controller.js");

module.exports = app => {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, Content-Type, Accept"
    );
    next();
  });

  app.post("/api/signup", auths.signUp);
  app.post("/api/signin", auths.signIn);
};