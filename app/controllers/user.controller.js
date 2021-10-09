const User = require("../models/user.model.js");

exports.findByID = (req, res) => {
    User.findByID(req.params.userID, (err, data) => {
      if (err.message) {
        if (err.message === "not_found") {
          res.status(404).send({
            message: `Not found user with id ${req.params.userID}.`
          });
        } else {
          res.status(500).send({
            message: "Error retrieving user with id " + req.params.userID
          });
        }
      } else {
        delete data.password;
        res.send(data);
      }
    });
};

exports.remove = (req, res) => {
    var datetime = new Date();

    const user = new User({
        deleted_at: datetime
    });

    User.remove(req.params.userID, user, (err, data) => {
      if (err.message) {
        if (err.message === "not_found") {
          res.status(404).send({
            message: `Not found user with id ${req.params.userID}.`
          });
        } else {
          res.status(500).send({
            message: "Could not delete user with id " + req.params.userID
          });
        }
      } else res.send({ message: `User have been deleted successfully!` });
    });
};