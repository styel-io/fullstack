const express = require("express");
const router = express.Router();
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const { check, validationResult } = require("express-validator"); // https://express-validator.github.io/docs/ 사용법

const User = require("../../models/User");

// ???????

// @route    POST api/users
// @desc     Register user // 회원가입
// @access   Public  // 접근권한 모두 가능
router.post(
  "/",
  [
    // name값이 없거나 비어있거나, email값이 email형식이 아니거나, password가 6자리 이하면 에러 메시지를 발생시킨다.
    check("name", "Name is required")
      .not()
      .isEmpty(),
    check("email", "Please include a valid email").isEmail(),
    check(
      "password",
      "Please enter a password with 6 or more characters"
    ).isLength({ min: 6 })
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password, role } = req.body;

    try {
      let user = await User.findOne({ email });

      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: "User already exists" }] });
      }

      const avatar = gravatar.url(email, {
        s: "200",
        r: "pg",
        d: "mm"
      });

      user = new User({
        name,
        email,
        avatar,
        password,
        role
      });

      // salt를 생성하여 변수 salt에 담는다.
      const salt = await bcrypt.genSalt(10);

      // 요청받은 패스워드값과 salt를 이용하여 해쉬화 하고 user.password에 담는다.
      user.password = await bcrypt.hash(password, salt);

      // 데이터 베이스에 저장한다.
      await user.save();

      // 토큰에 저장할 user.id값을 payload 변수에 담는다.
      const payload = {
        user: {
          id: user.id
        }
      };

      // jwt 토큰을 생성하고 에러가 없으면 클라이언트에게 토큰을 전달한다.
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
