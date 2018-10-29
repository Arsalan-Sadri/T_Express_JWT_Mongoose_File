const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const userAuth = require("../../../middleware/user-auth");
const db = require("../../../models/user");
if (process.env.NODE_ENV !== 'production') require("dotenv").load();

module.exports = function (app) {

    app.get("/", function (req, res) {
        res.send("App is running!");
    });

    app.post("/sign-up", function (req, res) {

        bcrypt.hash(req.body.password, 10, function (err, encrypted) {
            if (err) res.sendStatus(400);
            else {
                req.body.password = encrypted;
                db.User.create( req.body
                ).then(function (addedUser) {
                    res.json(addedUser);
                }).catch(function (err) {
                    res.send(err);
                });
            }
        });
    });

    app.post("/log-in", function (req, res) {

        db.User.findOne({
            email: req.body.email
        }).then(function (dbUser) {
            bcrypt.compare(req.body.password, dbUser.password, function (err, same) {
                if (err) res.send(err);
                else if (same) {

                    jwt.sign({
                        email: dbUser.email
                    }, process.env.JWT_KEY, {
                        expiresIn: "1h"
                    }, function (err, token) {
                        if (err) res.send(err);
                        else {
                            res.send(token);
                        }
                    });

                } else res.send("Wrong password!"); // res.sendStatus(403);
            });
        }).catch(function (err) {
            res.send("Email not found!"); // res.sendStatus(403);
        });

    });

    // The route to be protected
    app.post("/api/posts", userAuth, function (req, res) {
        res.send("Post created...");
    });
};