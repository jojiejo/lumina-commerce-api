const Item = require("../models/item.model.js");

exports.create = (req, res) => {
    var datetime = new Date();

    const item = new Item({
        name: req.body.name,
        price: req.body.price,
        quantity: req.body.quantity,
        unit: req.body.unit,
        created_at: datetime,
    });

    Item.create(item, (err, data) => {
        if (err){
          return res.status(500).send({ message: err.message || "Some error occurred while creating the item." });
        }
        else {
            return res.send(data);
        }
    });
};

exports.findAll = (req, res) => {
    Item.findAll((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving items."
        });
      else res.send(data);
    });
};


exports.findByID = (req, res) => {
    Item.findByID(req.params.itemID, (err, data) => {
      if (err.message) {
        if (err.message === "not_found") {
          res.status(404).send({
            message: `Not found item with id ${req.params.itemID}.`
          });
        } else {
          res.status(500).send({
            message: "Error retrieving item with id " + req.params.itemID
          });
        }
      } else {
        res.send(data);
      }
    });
};

exports.remove = (req, res) => {
    var datetime = new Date();

    const item = new Item({
        deleted_at: datetime
    });

    Item.remove(req.params.itemID, item, (err, data) => {
      if (err.message) {
        if (err.message === "not_found") {
          res.status(404).send({
            message: `Not found item with id ${req.params.itemID}.`
          });
        } else {
          res.status(500).send({
            message: "Could not delete item with id " + req.params.itemID
          });
        }
      } else res.send({ message: `Item have been deleted successfully!` });
    });
};