const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const User = require("../../models/User");
const Post = require("../../models/Post");

router.get('/', (req, res, next) => {
    console.log("login page test");
    res.render("login.html");
})

router.post('/login', async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    try {
        let user = await User.findOne({ email });
        let all_member = await User.count();
        let all_post = await Post.count();

        console.log(all_member);

        console.log('로그인 test');
        console.log(user);


        if (!user) {
            console.log('ID 없다고? -------------------------');
            res.render("fail.html");
        }
        console.log("role체크-------------------");
        
        if (user.role != "admin"){
            res.redirect("/admin");
        }
        const isMatch = await bcrypt.compare(password, user.password);

        console.log("-------------------------");
        console.log(isMatch);
        if (!isMatch) {
            console.log("password 없다고? ----------------");
            res.render("fail.html");
        }
        req.session.user = user.name;

        req.session.save(function () {
            res.render("dashboard.ejs", {
                user: req.session.user,
                all_member: all_member,
                all_post: all_post
            });
        })


    } catch (err) {
        console.log("왜 ㅠㅠ");
        console.log(err);
    }



})


router.get("/logout", (req, res) => {
    req.session.destroy();
    res.redirect("/admin");
})

module.exports = router;
