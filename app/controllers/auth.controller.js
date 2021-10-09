const config = require("../config/auth.config");

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
const User = require("../models/user.model.js");

exports.signUp = (req, res) => {
    var datetime = new Date();

    const user = new User({
        email: req.body.email,
        name: req.body.name,
        password: bcrypt.hashSync(req.body.password, 8),
        role: req.body.role,
        created_at: datetime
    });

    User.findByEmail(user.email, (err, data) => {
        if(!data){
            User.create(user, (err, data) => {
                if (err){
                  return res.status(500).send({ message: err.message || "Some error occurred while creating the User." });
                }
                else {
                    delete data.password;
                    return res.send(data);
                }
            });
        } else {
            res.status(500).send({
                message: "Entered email has been registered."
            });
        }
    });
};

exports.signIn = (req, res) => {
    User.findByEmail(req.body.email, (err, user) => {
        if (err.message == 'null')
            return res.status(500).send({message: err.message || "Some error occurred while signin in."
        });

        if (!user) {
            return res.status(404).send({ message: "User Not found." });
        }

        var passwordIsValid = bcrypt.compareSync(
            req.body.password,
            user.password
        );

        if (!passwordIsValid) {
            return res.status(401).send({
              accessToken: null,
              message: "Invalid Password!"
            });
        }
        
        var token = jwt.sign({ id: user.id, role: user.role }, config.secret, {
            expiresIn: 86400
        });

        res.status(200).send({
            accessToken: token,
            user
        });
    });
};