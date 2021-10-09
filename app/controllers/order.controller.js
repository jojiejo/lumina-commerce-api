const Order = require("../models/order.model.js");
const OrderDetails = require("../models/order_details.model.js");

exports.create = (req, res) => {
    var datetime = new Date();

    const order_details = req.body.details;
    const total = order_details.reduce((sum, { price, quantity }) => sum + price * quantity, 0)

    const order = new Order({
        user_id: req.user_id,
        total: total,
        created_at: datetime,        
    })

    Order.create(order, (err, data) => {
        if (err){
          return res.status(500).send({ message: err.message || "Some error occurred while creating the order." });
        }
        else {
            order_details.forEach((detail) => {
                const order_detail = new OrderDetails ({
                    order_id: data.id,
                    price: detail.price,
                    quantity: detail.quantity
                });

                OrderDetails.create(order_detail, (err, detail_data) => {
                    if (err){
                        return res.status(500).send({ message: err.message || "Some error occurred while creating the order." });
                    } else return res.send(data);
                });
            });
        }
    });
};

exports.findByUserID = (req, res) => {
    Order.findByUserID(req.params.userID, (err, data) => {
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