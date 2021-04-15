const { Schema, model } = require("mongoose");

const recipeSchema = new Schema({
    name: String,
    description: String,
    ingredients: Array,
    comments: Array,
    rate: Number,
    picture: String,
    author: Schema.Types.ObjectId
});

const Recipe = model("Recipe", recipeSchema);

module.exports = Recipe;