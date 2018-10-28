const db = require("../models/user");

module.exports = {
    create: function(req, res) {
        db.User
            .create(req.body)
            .then(addedUser => res.json(addedUser))
            .catch(err => res.send(err));
    }
};
