const sql = require("./db.js");

const User = function(user) {
  this.email = user.email;
  this.name = user.name;
  this.role = user.role;
  this.password = user.password;
  this.created_at = user.created_at;
  this.updated_at = user.updated_at;
  this.deleted_at = user.deleted_at;
};

User.create = (newUser, result) => {
    sql.query("INSERT INTO users SET ?", newUser, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      delete newUser.password;
      console.log("Created user: ", { id: res.insertId, ...newUser });
      result(null, { id: res.insertId, ...newUser });
    });
};

User.findByEmail = (userEmail, result) => {
    sql.query(`SELECT * FROM users WHERE email = '${userEmail}'`, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      if (res.length) {
        console.log("found customer: ", res[0]);
        result({ message: null }, res[0]);
        return;
      }
  
      result({ message: "not_found" }, null);
    });
};

User.findByID = (userID, result) => {
  sql.query(`SELECT * FROM users WHERE id = '${userID}' AND deleted_at IS NULL`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found user: ", res[0]);
      result({ message: null }, res[0]);
      return;
    }

    result({ message: "not_found" }, null);
  });
};

User.remove = (userID, user, result) => {
  sql.query(
    "UPDATE users SET deleted_at = ? WHERE id = ? AND deleted_at IS NULL",
    [user.deleted_at, userID],
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

      console.log("updated customer: ", { id: userID, ...user });
      result({ message: null }, { id: userID, ...user });
    }
  );
};

module.exports = User;