
const bcrypt = require("bcrypt");

const router = require("express").Router();
const userControlller = require("../../../controllers/userController");

router
    .route("/sign-up")
    .post((req, res) => {
        bcrypt.hash(req.body.password, 10, function (err, encrypted) {
            if (err) res.sendStatus(400);
            else {
                req.body.password = encrypted;
                userControlller.create(req, res);
            }
        });
    });

router
    .route("/sign-in")
    .post((req, res) => {
        userControlller.findByEmail(req, res);
        // dbUser => res.json(dbUser);
    });


module.exports = router;
