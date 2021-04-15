const express = require("express");
const router = express.Router({mergeParams: true});
const bcrypt = require("bcrypt");
const User = require("../models/User");
const fs = require("fs");

const saltRounds = 10;

router.get("/", async (req, res) => {
    const users = await User.find();
    return res.send([
        ...users
    ]);
});

router.get("/:id", async (req, res) => {
    const user = await User.findOne({_id: req.params.id});
    return res.send(user);
});

router.post("/", async (req, res) => {
    bcrypt.hash(req.body.password, saltRounds, (err, hash) => {
        const newUser = new User({
            name: req.body.name,
            bio: "",
            recipes: [],
            password: hash,
            picture: "userImages/default.png"
        });
        newUser.save((err, resolve) => {
            if (err) throw err;
            return res.send(resolve);
        });
    });

});

router.post("/login", async (req, res) => {
    const password = req.body.password;
    const id = req.body.id;
    const user = await User.findOne({_id: id});
    bcrypt.compare(password, user.password, (err, result) => {
        if (err) throw err;
        return res.send({auth: result});
    });
});

router.delete("/:id/recipe", async (req, res) => {
    res.send({
        updatedComments: []
    });
});

router.put("/:id/profile", async (req, res) => {
    const bio = req.body.bio;
    const id = req.params.id;
    const base64Image = req.body.base64Image ? req.body.base64Image.replace(/^data:image\/png;base64,/, "") : null;
    const path = `../webapp/public/userImages/${id}.png`

    if (base64Image) {
        if (fs.existsSync(path)) {
            fs.unlinkSync(path, (err) => console.log(err));
        };
        fs.writeFileSync(path, base64Image, "base64", (err) => console.log(err));
        await User.updateOne({_id: id}, {bio: bio, picture: `userImages/${id}.png`})
        return res.send({
            bio: bio,
            picture: `userImages/${id}.png`
        });
    } else {
        await User.updateOne({_id: id}, {bio: bio})
        return res.send({
            bio,
        });
    };
    
});

// router.delete("/:id", async (req, res) => {
//     res.send({
//         updatedRecipes: []
//     });
// });

module.exports = router;