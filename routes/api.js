const express = require("express");
const router = express.Router();

router.get("/contacts", (req, res) => {
    res.send("hit all contacts");
});

router.get("/contact/:id", (req, res) => {
    res.send("hit specific contact " + req.params.id)
});

router.post("/contact", (req, res) => {
    res.send("hit adding contact");
});

router.put("/contact/:id", (req, res) => {
    res.send("hit update contact " + req.params.id);
});

router.delete("/contact/:id", (req, res) => {
    res.send("hit specific contact for deletion " + req.params.id)
});

module.exports = router;