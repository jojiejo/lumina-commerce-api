checkEmptyRequest = (req, res, next) => {
    if (!req.body) {
        return res.status(400).send({
          message: "Content can not be empty!"
        });
    }

    next();
};

const auth = {
    checkEmptyRequest: checkEmptyRequest
};

module.exports = auth;