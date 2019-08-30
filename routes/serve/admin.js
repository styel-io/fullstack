const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const User = require("../../models/User");
const Post = require("../../models/Post");

router.get("/", (req, res, next) => {
  console.log("login page test");
  res.render("login.html");
});

router.post("/login", async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  try {
    let user = await User.findOne({ email });

    // console.log('로그인 test');
    // console.log(user);

    if (!user) {
      console.log("ID 없다고? -------------------------");
      res.redirect("/admin/error");
    }
    console.log("role체크-------------------");

    if (user.role != "admin") {
      res.redirect("/admin/error");
      return false;
    }
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      console.log("password 없다고? ----------------");
      res.redirect("/admin/error");
      return false;
    }
    req.session.user = email;

    req.session.save(function() {
      res.redirect("/admin/dashboard");
    });
  } catch (err) {
    console.log("왜 ㅠㅠ");
    console.log(err);
  }
});

router.get("/dashboard", async (req, res) => {
  console.log(req.session.user);
  try {
    if (!req.session.user) {
      console.log("로그인이 안되어 있음");
      res.redirect("/admin/error");
      return false;
    }
    let email = req.session.user;
    let user = await User.findOne({ email });

    // console.log(user);
    if (user.role != "admin") {
      // 로그인은 되어 있는데 어드민이 아닌 경우
      res.redirect("/admin/error");
      return false;
    }

    let all_member = await User.count();
    let black_member = await User.count({ role: "blacklist" });
    let all_post = await Post.count();

    console.log(black_member);

    res.render("dashboard.ejs", {
      user: user.name,
      all_member: all_member,
      black_member: black_member,
      all_post: all_post
    });
  } catch (err) {
    console.log("error다!");
    console.log(err);
  }
});

router.get("/logout", (req, res) => {
  req.session.destroy();
  res.redirect("/admin");
});

router.get("/member_manage", async (req, res) => {
  try {
    let page = req.query.page;
    // 몇 페이지인지 데이터 받아오기

    if (!page) {
      page = 1;
    } else {
      page = parseInt(page);
    }
    // 처음 들어갔을 경우 페이지 값을 못 받아 오기 때문에 값이 없을 경우 1부여
    // 기본적으로 받아오는 값이 int가 아니기 때문에 int로 치환

    let skip = (page - 1) * 10;
    // 페이징을 위한 스킵할 데이터의 수
    let limit = 10;
    // 한 페이지에 보여줄 데이터의 수

    let all_member = await User.find()
      .skip(skip)
      .limit(limit);
    // 보여줄 데이터

    if (!req.session.user) {
      // 로그인이 안되어 있는 경우 돌리기
      res.redirect("/admin/error");
      return false;
    } else {
      let email = req.session.user;
      let count_member = await User.count();
      let user = await User.findOne({ email });

      let pnSize = 10;
      let pnTotal = Math.ceil(count_member / limit);
      let pnStart = (Math.ceil(page / pnSize) - 1) * pnSize + 1;
      let pnEnd = pnStart + pnSize - 1;

      if (pnEnd > pnTotal) {
        pnEnd = pnTotal;
      }

      console.log(pnEnd);

      if (user.role != "admin") {
        res.redirect("/admin/error");
        return false;
      }
      res.render("manage.ejs", {
        user: user.name,
        all_member: all_member,
        pnStart: pnStart,
        pnEnd: pnEnd,
        pnTotal: pnTotal,
        page: page
      });
    }
  } catch (err) {
    console.log("error 발생 ㅠㅠ");
    console.log(err);
  }
});

router.get("/admin_change", async (req, res) => {
  try {
    if (!req.session.user) {
      // 로그인이 안되어 있는 경우 돌리기
      res.redirect("/admin/error");
      return false;
    } else {
      let email = req.session.user;
      let user = await User.findOne({ email });
      if (user.role != "admin") {
        res.redirect("/admin/error");
        return false;
      }
      let change_user = req.query.user;
      console.log("change_user: " + change_user);

      const result = await User.updateOne(
        { email: change_user },
        { $set: { role: "admin" } }
      );

      console.log(result);
      res.redirect("/admin/member_manage");
    }
  } catch (err) {
    console.log("에러 발생!!!");
    console.log(err);
  }
});

router.get("/black_change", async (req, res) => {
  try {
    if (!req.session.user) {
      // 로그인이 안되어 있는 경우 돌리기
      res.redirect("/admin/error");
      return false;
    } else {
      let email = req.session.user;
      let user = await User.findOne({ email });
      if (user.role != "admin") {
        res.redirect("/admin/error");
        return false;
      }
      let change_user = req.query.user;
      console.log("change_user: " + change_user);

      const result = await User.updateOne(
        { email: change_user },
        { $set: { role: "blacklist" } }
      );

      console.log(result);
      res.redirect("/admin/member_manage");
    }
  } catch (err) {}
});

router.get("/error", (req, res) => {
  res.render("admin_error.ejs");
});

module.exports = router;
