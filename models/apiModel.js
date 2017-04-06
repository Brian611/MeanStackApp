const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ContactSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    cellNo: {
        type: String,
        required: true,
        unique: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Contact = module.exports = mongoose.model("Contact", ContactSchema);

module.exports.getAllContacts = (callback) => {
    query = {}
    Contact.find(query, callback).sort({ createdAt: -1 });
};

module.exports.getContactById = (id, callback) => {
    Contact.findById(id, callback);
};

module.exports.addContact = (newContact, callback) => {
    newContact.save(callback);
};

module.exports.updateContact = (id, updatedContact, callback) => {
    Contact.findByIdAndUpdate(id, { $set: updatedContact }, { new: true, upsert: true }, callback);
};

module.exports.deleteContact = (id, callback) => {
    Contact.findByIdAndRemove(id, callback);
}