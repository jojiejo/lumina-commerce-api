const sql = require("./db.js");

const Item = function(item) {
  this.name = item.name;
  this.price = item.price;
  this.quantity = item.quantity;
  this.unit = item.unit;
  this.created_at = item.created_at;
  this.updated_at = item.updated_at;
  this.deleted_at = item.deleted_at;
};

Item.create = (newItem, result) => {
    sql.query("INSERT INTO items SET ?", newItem, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
      
      console.log("Created item: ", { id: res.insertId, ...newItem });
      result(null, { id: res.insertId, ...newItem });
    });
};

Item.findAll = result => {
    sql.query("SELECT * FROM items WHERE deleted_at IS NULL", (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      console.log("items: ", res);
      result(null, res);
    });
};

Item.findByID = (itemID, result) => {
    sql.query(`SELECT * FROM items WHERE id = '${itemID}' AND deleted_at IS NULL`, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      if (res.length) {
        console.log("found item: ", res[0]);
        result({ message: null }, res[0]);
        return;
      }
  
      result({ message: "not_found" }, null);
    });
  };
  
Item.remove = (itemID, item, result) => {
  sql.query(
    "UPDATE items SET deleted_at = ? WHERE id = ? AND deleted_at IS NULL",
    [item.deleted_at, itemID],
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

      console.log("updated item: ", { id: itemID, ...item });
      result({ message: null }, { id: itemID, ...item });
    }
  );
};

module.exports = Item;