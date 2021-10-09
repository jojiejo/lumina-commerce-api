const sql = require("./db.js");

const OrderDetails = function(order_details) {
  this.order_id = order_details.order_id;
  this.price = order_details.price;
  this.quantity = order_details.quantity;
};

OrderDetails.create = (newOrderDetail, result) => {
    sql.query("INSERT INTO order_details SET ?", newOrderDetail, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      console.log("Created order detail: ", { id: res.insertId, ...newOrderDetail });
      result(null, { id: res.insertId, ...newOrderDetail });
    });
};

Order.findByOrderID = (orderID, result) => {
    sql.query(`SELECT * FROM order_details WHERE order_id = '${orderID}'`, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      if (res.length) {
        console.log("found order: ", res);
        result({ message: null }, res);
        return;
      }
  
      result({ message: "not_found" }, null);
    });
};

module.exports = OrderDetails;