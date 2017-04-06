const express = require("express");
const router = express.Router();
const Contact = require("../models/apiModel");
const _ = require("lodash");

function getParamId(req) {
    return req.params.id;
}

router.get("/contacts", (req, res) => {
    Contact.getAllContacts((err, contacts) => {
        if (err) {
            res.status(500);
            res.json({ success: false, msg: err.errmsg });
        } else {
            if (_.isEmpty(contacts)) {
                res.status(404);
                res.json({ success: false, msg: "There are no contacts!" });
            } else {
                res.status(200);
                res.json(contacts);
            }
        }
    })
});

router.get("/contact/:id", (req, res) => {

    Contact.getContactById(getParamId(req), (err, contact) => {
        if (err) {
            res.status(500);
            res.json({ success: false, msg: err.errmsg });
        } else {
            if (_.isEmpty(contact)) {
                res.status(404);
                res.json({ success: false, msg: "Contact not found!" });
            } else {
                res.status(200);
                res.json(contact);
            }
        }
    });
});

router.post("/contact", (req, res) => {
    let newContact = new Contact({
        name: req.body.name,
        cellNo: req.body.cellNo
    });

    Contact.addContact(newContact, (err, contact) => {
        if (err) {
            res.status(500);
            res.json({ success: false, msg: err.errmsg });
        } else {
            res.status(201);
            res.json(contact);
        }
    });
});

router.put("/contact/:id", (req, res) => {
    
    let updatedContact = req.body;

    Contact.updateContact(getParamId(req), updatedContact, (err, contact) => {
        if (err) {
            res.status(500);
            res.json({ success: false, msg: err.errmsg });
        } else {
            res.status(200);
            res.json({ success: true, contact: contact });
        }
    });
});

router.delete("/contact/:id", (req, res) => {
    Contact.deleteContact(getParamId(req), (err, contact) => {
        if (err) {
            res.status(500);
            res.json({ success: false, msg: err.errmsg });
        } else {
            res.status(200);
            res.json({ success: true, contact: contact });
        }
    });
});

module.exports = router;