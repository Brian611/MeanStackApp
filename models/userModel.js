const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");

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
        type: Date,
        default: Date.now
    }
});

const User = module.exports = mongoose.model("User", UserSchema);

module.exports.getAllUsers = (callback) => {
    query = {};
    User.find(query, callback).sort({ createdAt: -1 });
};

module.exports.getUserById = (id, callback) => {
    User.findById(id, callback);
};

module.exports.getUserByUsername = (username, callback) => {
    query = { username: username };
    User.findOne(query, callback);
};

module.exports.addUser = (newUser, callback) => {
    bcrypt.genSalt(10, (err, salt) => {
        if (err) throw err;
        bcrypt.hash(newUser.password, salt, (err, hash) => {
            newUser.password = hash;
            newUser.save(callback);
        });
    });
};

module.exports.comparePassword = (password, user, callback) => {

    // Load hash from your password DB. 
    bcrypt.compare(password, user.password, (err, isMatch) => {
        if (err) throw err;
        if (isMatch) {
            callback(null, isMatch);
        }
    });
};


module.exports.updateUser = (id, updatedUser, callback) => {
    User.findByIdAndUpdate(id, { $set: updatedUser }, { new: true, upsert: true }, callback);
};

module.exports.deleteUser = (id, callback) => {
    User.findByIdAndRemove(id, callback);
};