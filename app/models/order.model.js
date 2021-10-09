const sql = require("./db.js");

const Order = function(order) {
  this.user_id = order.user_id;
  this.total = order.total;
  this.created_at = order.created_at;
  this.updated_at = order.updated_at;
  this.deleted_at = order.deleted_at;
};

Order.create = (newOrder, result) => {
    sql.query("INSERT INTO orders SET ?", newOrder, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      console.log("Created order: ", { id: res.insertId, ...newOrder });
      result(null, { id: res.insertId, ...newOrder });
    });
};

Order.findByUserID = (userID, result) => {
    sql.query(`SELECT * FROM orders 
        WHERE user_id = '${userID}' 
            AND orders.deleted_at IS NULL `, (err, res) => {
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

module.exports = Order;