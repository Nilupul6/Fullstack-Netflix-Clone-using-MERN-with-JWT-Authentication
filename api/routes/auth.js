const router = require('express').Router();
const User = require("../models/User");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");


//Register 
router.post("/register",async (req,res,)=>{
    const newUser = new User({
        username:  req.body.username,
        email:  req.body.email,
        password:  CryptoJS.AES.encrypt(req.body.password, process.env.SECRET_KEY).toString(),
    });
    try {
        const user = await newUser.save();
        res.status(201).json(user);    
    } catch (error) {
        res.status(500).json(error); 
        console.log(error);
    }
});

//login
router.post("/login", async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            return res.status(401).json("Wrong user or password");
        }

        var bytes = CryptoJS.AES.decrypt(user.password, process.env.SECRET_KEY);
        var originalText = bytes.toString(CryptoJS.enc.Utf8);

        if (originalText !== req.body.password) {
            return res.status(401).json("Wrong user or password");
        }

        const accessToken = jwt.sign({id: user._id, isAdmin: user.isAdmin}, process.env.SECRET_KEY, {expiresIn:"5d"});

        const { password, ...info } = user._doc;

        res.status(200).json({...info, accessToken});

    } catch (error) {
        res.status(400).json(error);
    }
});




module.exports = router;
