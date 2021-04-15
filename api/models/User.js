const { Schema, model } = require("mongoose");

const userSchema = new Schema({
    name: String,
    bio: String,
    recipes: Array,
    password: String,
    picture: String
});

const User = model("User", userSchema);

module.exports = User;