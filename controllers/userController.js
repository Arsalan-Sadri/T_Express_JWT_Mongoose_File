const db = require("../models/user");

module.exports = {
    create: function(req, res) {
        db.User
            .create(req.body)
            .then(addedUser => res.json(addedUser))
            .catch(err => res.send(err));
    },
    findByEmail: function (req, res) {
        db.User
            .findOne({
                email: req.body.email
            })
            .then(dbUser => res.json(dbUser))
            .catch(err => res.send(err));
    }
};
