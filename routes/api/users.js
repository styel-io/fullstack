const express = require("express");
const router = express.Router();
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const { check, validationResult } = require("express-validator"); // https://express-validator.github.io/docs/ 사용법

const User = require("../../models/User");

// @route    POST api/users
// @desc     Register user
// @access   Public
router.post(
  "/",
  [
    check("name", "Name is required")
      .not()
      .isEmpty(),
    // username must be an email
    check("email", "Please include a valid email").isEmail(),
    // password must be at least 6 chars long
    check(
      "password",
      "Please enter a password with 6 or more characters"
    ).isLength({ min: 6 })
  ],
  async (req, res) => {
    const errors = validationResult(req);
    // Finds the validation errors in this request and wraps them in an object with handy functions
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;

    try {
      // 요청받은 email 값을 데이터베이스에서 검증하여 user값에 넣는다
      let user = await User.findOne({ email: email });

      // 만약 유저가 존재한다면 status 400 응답과 함께 에러 메시지를 나타낸다.
      if (user) {
        res.status(400).json({ errors: [{ mgs: "User already exists" }] });
      }

      const avatar = gravatar.url(email, {
        // s: size, rating: , mm
        s: "200",
        r: "pg", // people grade
        d: "mm"
      });

      user = new User({
        name,
        email,
        avatar,
        password
      });

      const salt = await bcrypt.genSalt(10);

      user.password = await bcrypt.hash(password, salt);

      await user.save();

      const payload = {
        user: {
          id: user.id
        }
      };

      jwt.sign(
        payload,
        config.get("jwtSecret"),
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  }
);

// @route    POST api/users
// @desc     Register user
// @access   Public
router.post(
  "/",
  [
    check("name", "Name is required")
      .not()
      .isEmpty(),
    // username must be an email
    check("email", "Please include a valid email").isEmail(),
    // password must be at least 6 chars long
    check(
      "password",
      "Please enter a password with 6 or more characters"
    ).isLength({ min: 6 })
  ],
  async (req, res) => {
    const errors = validationResult(req);
    // Finds the validation errors in this request and wraps them in an object with handy functions
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;

    try {
      // 요청받은 email 값을 데이터베이스에서 검증하여 user값에 넣는다
      let user = await User.findOne({ email: email });

      // 만약 유저가 존재한다면 status 400 응답과 함께 에러 메시지를 나타낸다.
      if (user) {
        res.status(400).json({ errors: [{ mgs: "User already exists" }] });
      }

      const avatar = gravatar.url(email, {
        // s: size, rating: , mm
        s: "200",
        r: "pg", // people grade
        d: "mm"
      });

      user = new User({
        name,
        email,
        avatar,
        password
      });

      const salt = await bcrypt.genSalt(10);

      user.password = await bcrypt.hash(password, salt);

      await user.save();

      const payload = {
        user: {
          id: user.id
        }
      };

      jwt.sign(
        payload,
        config.get("jwtSecret"),
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  }
);
module.exports = router;
