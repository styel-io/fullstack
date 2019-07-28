const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const config = require("config");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { check, validationResult } = require("express-validator");

const User = require("../../models/User");

// @route    GET api/auth
// @desc     Test route
// @access   Public
router.get("/", auth, async (req, res) => {
  try {
    // .select("-password") password는 제외하고 불러온다
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route    POST api/auth
// @desc     Authenticate user & get token
// @access   Public
router.post(
  "/",
  [
    // username must be an email
    check("email", "Please include a valid email").isEmail(),
    // password must be at least 6 chars long
    check("password", "Password is required").exists()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    // Finds the validation errors in this request and wraps them in an object with handy functions
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      // 요청받은 email 값을 데이터베이스에서 검증하여 user값에 넣는다
      let user = await User.findOne({ email });

      // 만약 유저가 존재하지 않는다면 status 400 응답과 함께 에러 메시지를 나타낸다.
      if (!user) {
        // res.status(400).json({ errors: [{ msg: "Invalid Credentials" }] });
        res.status(400).json({ errors: [{ msg: "Invalid Email" }] });
        return;
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        // res.status(400).json({ errors: [{ msg: "Invalid Credentials" }] });
        res.status(400).json({ errors: [{ msg: "Invalid Password" }] });
      }

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
