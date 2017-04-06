const express = require("express");
const router = express.Router();
const User = require("../models/userModel");
const _ = require("lodash");
const passport = require("passport");
const config = require("../config/database");
const jwt = require('jsonwebtoken');

function getParamId(req) {
    return req.params.id;
}

router.get("/users", passport.authenticate('jwt', { session: false }), (req, res) => {
    User.getAllUsers((err, users) => {
        if (err) {
            res.status(500);
            res.json({ success: false, msg: err.errmsg });
        } else {
            if (_.isEmpty(users)) {
                res.status(404);
                res.json({ success: false, msg: "Users unavailable!" });
            } else {
                res.status(200);
                res.json(users);
            }
        }
    });
});

router.get("/user/:id", passport.authenticate('jwt', { session: false }), (req, res) => {
    User.getUserById(getParamId(req), (err, user) => {
        if (err) {
            res.status(500);
            res.json({ success: false, msg: err.errmsg });
        } else {
            if (_.isEmpty(user)) {
                res.status(404);
                res.json({ success: false, msg: "User not found!" });
            } else {
                res.status(200);
                res.json(user);
            }
        }
    });
});

router.post("/user", (req, res) => {
    let newUser = new User({
        name: req.body.name,
        username: req.body.username,
        password: req.body.password
    });

    User.addUser(newUser, (err, user) => {
        if (err) {
            res.status(500);
            res.json({ success: false, msg: err.errmsg });
        } else {
            res.status(201);
            res.json({ success: false, msg: "User " + user.name + " has been added successfully!" });
        }
    });
});

router.post("/authenticate", (req, res) => {
    username = req.body.username;
    password = req.body.password;

    User.getUserByUsername(username, (err, user) => {
        console.log(user);
        if (err) {
            res.status(500);
            res.json({ success: false, msg: err.errmsg });
        } else {
            if (_.isEmpty(user)) {
                res.status(404);
                res.json({ success: false, msg: "User not found!" });
            } else {
                User.comparePassword(password, user, (err, isMatch) => {
                    if (!isMatch) {
                        res.status(400);
                        res.json({ success: false, msg: "Invalid credentials!" });
                    } else {
                        res.status(200);
                        let sessionUser = {
                            _id: user._id,
                            name: user.name,
                            username: user.username,
                            createdAt: user.createdAt
                        }
                        const token = jwt.sign(user, config.secret, { expiresIn: 604800 });
                        res.json({
                            token: "JWT " + token,
                            user: sessionUser
                        });
                    }
                });
            }
        }
    });
});

module.exports = router;