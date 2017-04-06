const express = require("express");
const router = express.Router();
const User = require("../models/userModel");
const _ = require("lodash");

function getParamId(req) {
    return req.params.id;
}

router.get("/users", (req, res) => {
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

router.get("/user/:id", (req, res) => {
    User.getUser(getParamId(req), (err, user) => {
        if (err) {
            res.status(500);
            res.json({ success: false, msg: err.errmsg });
        } else {
            if (_.isEmpty(user)) {
                res.status(404);
                res.json({ success: false, msg: "Contact not found!" });
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

router.put("/user/:id", (req, res) => {

    let updatedUser = req.body;

    User.updateUser(getParamId(req), updatedUser, (err, user) => {
        if (err) {
            res.status(500);
            res.json({ success: false, msg: err.errmsg });
        } else {
            res.status(200);
            res.json({ success: false, msg: "User " + user.name + " has been updated successfully!" });
        }
    });
});

router.delete("/user/:id", (req, res) => {
    User.deleteUser(getParamId(req), (err, user) => {
        if (err) {
            res.status(500);
            res.json({ success: false, msg: err.errmsg });
        } else {
            res.status(200);
            res.json({ success: false, msg: "User " + user.name + " has been updated successfully!" });
        }
    });
});

module.exports = router;