const db = require("../models/user");
const bcrypt = require("bcrypt");

module.exports = {
    create: function(req, res) {
        bcrypt.hash(req.body.password, 10, function(err, encrypted) {
            if (err) res.sendStatus(400);
            else {
                req.body.password = encrypted;
                db.User
                    .create(req.body)
                    .then(addedUser => res.json(addedUser))
                    .catch(err => res.send(err));
            }
        });
    },
    findByEmail: function(req, res) {
        db.User
            .findOne({
                email: req.body.email
            })
            .then(next())
            .catch(err => res.send(err));
    }
};
