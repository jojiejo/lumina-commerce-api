const Cart = require("../models/cart.model.js");

exports.create = (req, res) => {
    var datetime = new Date();

    const cart = new Cart({
        user_id: req.user_id,
        item_id: req.body.item_id,
        quantity: req.body.quantity,
        created_at: datetime,
    });

    Cart.create(cart, (err, data) => {
        if (err){
          return res.status(500).send({ message: err.message || "Some error occurred while creating the item." });
        }
        else {
            return res.send(data);
        }
    });
};

exports.findByUserID = (req, res) => {
    Cart.findByUserID(req.params.userID, (err, data) => {
      if (err.message) {
        if (err.message === "not_found") {
          res.status(404).send({
            message: `Not found cart with id ${req.params.userID}.`
          });
        } else {
          res.status(500).send({
            message: "Error retrieving cart with id " + req.params.userID
          });
        }
      } else {
        res.send(data);
      }
    });
};

exports.updateQuantity = (req, res) => {
    var datetime = new Date();

    const cart = new Cart({
        quantity: req.body.quantity,
        updated_at: datetime
    });

    Cart.updateQuantity(req.params.cartID, cart, (err, data) => {
      if (err.message) {
        if (err.message === "not_found") {
          res.status(404).send({
            message: `Not found cart with id ${req.params.cartID}.`
          });
        } else {
          res.status(500).send({
            message: "Could not update cart with id " + req.params.cartID
          });
        }
      } else res.send({ message: `Cart have been updated successfully!` });
    });
};

exports.remove = (req, res) => {
    var datetime = new Date();

    const cart = new Cart({
        deleted_at: datetime
    });

    Cart.remove(req.params.cartID, cart, (err, data) => {
      if (err.message) {
        if (err.message === "not_found") {
          res.status(404).send({
            message: `Not found cart with id ${req.params.cartID}.`
          });
        } else {
          res.status(500).send({
            message: "Could not delete cart with id " + req.params.cartID
          });
        }
      } else res.send({ message: `Cart have been deleted successfully!` });
    });
};