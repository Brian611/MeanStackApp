const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: {
        type: String
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    createdAt: {
        type: date,
        default: Date.now()
    }
});

const User = module.exports = mongoose.model("User", UserSchema);

module.exports.getUsers = (callback) => {
    query = {};
    User.find(query, callback).sort({ createdAt: -1 });
};

module.exports.getUser = (id, callback) => {
    User.findById(id, callback);
};

module.exports.addUser = (newUser, callback) => {
    newUser.save(callback);
};

module.exports.updateUser = (id, updatedUser, callback) => {
    User.findByIdAndUpdate(id, { $set: updatedUser }, { new: true, upsert: true }, callback);
};

module.exports.deleteUser = (id, callback) => {
    User.findByIdAndRemove(id, callback);
};