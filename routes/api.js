const express = require("express");
const router = express.Router();

router.get("contacts", (req, res) => {
    res.send("hit all contacts");
});

router.get("contacts/:id", (req, res) => {
    res.send("hit specific contact")
});

router.post("contact", (req, res) => {
    res.send("hit adding contact");
});

router.put("contact/:id", (req, res) => {
    res.send("hit update contact");
});

router.delete("contact/:id", (req, res) => {

});