const express = require("express");
const router = express.Router({mergeParams: true});
const Recipe = require("../models/Recipe");
const fs = require("fs");
const User = require("../models/User");
const { Types } = require("mongoose");


router.get("/", async (req, res) => {
    const recipes = await Recipe.find();
    return res.send([
        ...recipes
    ]);
});

router.post("/comment/:id", async (req, res) => {
    const id = req.params.id;
    const recipe = await Recipe.findOne({_id: id});
    const sum = recipe.comments.reduce((acc, c) => acc + c.rate, 0) + req.body.rate;;
    const newRate = sum / (recipe.comments.length + 1)
    await Recipe.updateOne({_id: id}, 
        {
            $push: { comments: req.body },
            rate: Math.round((newRate)*100)/100
        },
        { upsert: true }
    );
    return res.send(req.body);
});

router.post("/:id", async (req, res) => {
    const recipe = new Recipe({
        ...req.body,
        picture: `recipeImages/${req.body.imageId}.png`,
        author: req.params.id
    });
    const base64Image = req.body.image.replace(/^data:image\/png;base64,/, "");

    const result = await recipe.save(recipe);
    fs.writeFileSync(`../webapp/public/${recipe.picture}`, base64Image, "base64", (err) => console.log(err));
    await User.updateOne({_id: req.params.id}, {
        $push: { recipes: recipe._id }
    })

    return res.send(result);
});

router.delete("/:recipeId/comment/:id", async (req, res) => {
    const recipeId = req.params.recipeId;
    const commentId = req.params.id;
    const recipe = await Recipe.findOne({_id: recipeId});
    const sum = recipe.comments.reduce((acc, c) => c.commentId !== commentId ? acc + c.rate : acc, 0);
    const newRate = (recipe.comments.length - 1) === 0 ? 0 : sum / (recipe.comments.length + 1);

    await Recipe.updateOne({_id: recipeId}, {
        $pull: { comments: { commentId: commentId } },
        rate: newRate
    });

    return res.send({
        recipeId,
        commentId: commentId
    });
});

router.delete("/:id", async (req, res) => {
    const authorId = req.body.author;
    await Recipe.deleteOne({_id: req.params.id});
    await User.updateOne({_id: authorId}, {
        $pull: { recipes: Types.ObjectId(req.params.id) }
    });
    res.send({
        authorId,
        deletedId: req.params.id
    });
    return fs.unlinkSync(`../webapp/public/${req.body.picture}`); 
});

module.exports = router;