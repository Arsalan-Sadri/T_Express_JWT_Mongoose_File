// const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
// const userAuth = require("../../../middleware/user-auth");
// const db = require("../../../models/user");
// if (process.env.NODE_ENV !== 'production') require("dotenv").load();

const router = require("express").Router();
const userControlller = require("../../../controllers/userController");

router
    .route("/")
    .get(function (req, res, next) {
        res.send("It just works!");
    });

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
        res.json(dbUser)

        // console.log("\n********\nhello!");
    });


module.exports = router;
