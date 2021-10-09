const sql = require("./db.js");

const Cart = function(cart) {
  this.user_id = cart.user_id;
  this.item_id = cart.item_id;
  this.quantity = cart.quantity;
  this.created_at = cart.created_at;
  this.updated_at = cart.updated_at;
  this.deleted_at = cart.deleted_at;
};

Cart.create = (newCart, result) => {
    sql.query("INSERT INTO carts SET ?", newCart, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      console.log("Created cart: ", { id: res.insertId, ...newCart });
      result(null, { id: res.insertId, ...newCart });
    });
};

Cart.findByUserID = (userID, result) => {
    sql.query(`SELECT carts.id, carts.user_id, carts.item_id, carts.quantity FROM carts 
        INNER JOIN users    
        WHERE user_id = '${userID}' 
            AND carts.deleted_at IS NULL 
            AND users.deleted_at IS NULL`, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      if (res.length) {
        console.log("found cart: ", res);
        result({ message: null }, res);
        return;
      }
  
      result({ message: "not_found" }, null);
    });
};
  
Cart.updateQuantity = (cartID, cart, result) => {
    sql.query(
      "UPDATE carts SET quantity = ?, updated_at = ? WHERE id = ? AND deleted_at IS NULL",
      [cart.quantity, cart.updated_at, cartID],
      (err, res) => {
        if (err) {
          console.log("error: ", err);
          result({ message: null }, err);
          return;
        }
  
        if (res.affectedRows == 0) {
          result({ message: "not_found" }, null);
          return;
        }
  
        console.log("updated item: ", { id: cartID, ...cart });
        result({ message: null }, { id: cartID, ...cart });
      }
    );
};

Cart.remove = (cartID, cart, result) => {
  sql.query(
    "UPDATE carts SET deleted_at = ? WHERE id = ? AND deleted_at IS NULL",
    [cart.deleted_at, cartID],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result({ message: null }, err);
        return;
      }

      if (res.affectedRows == 0) {
        result({ message: "not_found" }, null);
        return;
      }

      console.log("updated cart: ", { id: cartID, ...cart });
      result({ message: null }, { id: cartID, ...cart });
    }
  );
};

module.exports = Cart;