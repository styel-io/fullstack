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
        
        console.log('로그인 test');
        console.log(user);


        if (!user) {
            console.log('ID 없다고? -------------------------');
            res.render("fail.html");
        }
        console.log("role체크-------------------");

        if (user.role != "admin") {
            res.redirect("/admin");
        }
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            console.log("password 없다고? ----------------");
            res.render("fail.html");
        }
        req.session.user = email;

        req.session.save(function () {
            res.redirect("/admin/dashboard");
        })
    } catch (err) {
        console.log("왜 ㅠㅠ");
        console.log(err);
    }
})

router.get("/dashboard", async (req, res) => {
    console.log(req.session.user);
    try {
        if (!req.session.user) {
            console.log("로그인이 안되어 있음");
            redirect("/admin");
        }
        let email = req.session.user;
        let user = await User.findOne({ email });
        
        console.log(user);
        if (user.role != "admin") {
            // 로그인은 되어 있는데 어드민이 아닌 경우
            res.redirect("/admin");
        }


        let all_member = await User.count();
        let all_post = await Post.count();
        
        res.render("dashboard.ejs", {
            user: req.session.user,
            all_member: all_member,
            all_post: all_post
        });


    } catch (err) {
        console.log("error다!");
        console.log(err);
    }
})


router.get("/logout", (req, res) => {
    req.session.destroy();
    res.redirect("/admin");
})

router.get("/member_manage", async (req, res) => {
    try {
        let all_member = await User.find({});
        //console.log(all_member);

        if (!req.session.user) {
            // 로그인이 안되어 있는 경우 돌리기

        } else {
            let email = req.session.user;
            let user = await User.findOne({ email });
            if (user.role != "admin") {
                res.redirect("/admin");
            }
            res.render("manage.ejs", {
                all_member: all_member
            })
        }

    } catch (err) {
        console.log("error 발생 ㅠㅠ");
        console.log(err);
    }
})

module.exports = router;
