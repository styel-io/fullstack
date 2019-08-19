const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const User = require("../../models/User");


router.get('/', (req, res, next) => {
    console.log("login page test");
    res.render("login.html");
})

router.post('/login', (req, res) => {
    console.log('로그인 test');

    const { email, password } = req.body;
    let user = User.findOne({ email });

    if(!user){
        console.log('ID 없다고? -------------------------');
        res.render("fail.html");
    }
    const isMatch = bcrypt.compare(password, user.password);

    if(!isMatch){
        console.log("password 없다고? ----------------");
        res.render("fail.html");
    }

    res.render("dashboard.html");
})

module.exports = router;
