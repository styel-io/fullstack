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
    // name값이 없거나 비어있거나, email값이 email형식이 아니거나, password가 12자리 이하면 에러 메시지를 발생시킨다.
    check("name", "Name is required")
      .not()
      .isEmpty(),
    check("email", "Please include a valid email").isEmail(),
    check("call_num", "Please enter your phone number")
      .not()
      .isEmpty(),
    check(
      "password",
      "Please enter a password with 12 or more characters"
    ).isLength({ min: 12 })
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, call_num, password, role } = req.body;

    try {
      let user = await User.findOne({ email });

      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: "User already exists" }] });
      }

      if (password) {
        let pw = checkPassword(password);
        console.log(pw);
        if (!pw) {
          return res
            .status(400)
            .json({
              errors: [
                {
                  msg:
                    "비밀번호는 영어, 숫자, 특수문자를 결합하여 12자를 써주세요"
                }
              ]
            });
        }
      }

      function checkPassword(pw) {
        const check1 = /^(?=.*[a-zA-Z])(?=.*[0-9]).{10,12}$/.test(pw); //영문,숫자
        const check2 = /^(?=.*[a-zA-Z])(?=.*[^a-zA-Z0-9]).{10,12}$/.test(pw); //영문,특수문자
        const check3 = /^(?=.*[^a-zA-Z0-9])(?=.*[0-9]).{10,12}$/.test(pw); //특수문자, 숫자
        if (!(check1 || check2 || check3)) {
          console.log("사용할 수 없은 조합입니다.");
          return false;
        }
        if (/(\w)\1\1/.test(pw)) {
          console.log(
            "같은 문자를 3번 이상 사용하실 수 없습니다.\n패스워드 설정안내를 확인해 주세요."
          );
          return false;
        }

        return true;
      }

      const avatar = gravatar.url(email, {
        s: "200",
        r: "pg",
        d: "mm"
      });

      user = new User({
        name,
        email,
        call_num,
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

router.put(
  "/modify",
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

    const { name, email, password } = req.body;
    console.log("왜?");
    console.log(name, email, password);
    try {
      let user = await User.findOne({ email });

      if (!user) {
        return res
          .status(400)
          .json({ errors: [{ msg: "없는 유저인데 어캐했누?" }] });
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
        password
      });

      // salt를 생성하여 변수 salt에 담는다.
      const salt = await bcrypt.genSalt(10);

      // 요청받은 패스워드값과 salt를 이용하여 해쉬화 하고 user.password에 담는다.
      password2 = await bcrypt.hash(password, salt);

      // Update
      const result = await User.updateOne(
        { email: email },
        { $set: { name: name, password: password2 } }
      );
      console.log(result);
      // 토큰에 저장할 user.id값을 payload 변수에 담는다.
      const payload = {
        User: {
          id: User.id
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

router.get("/my_page", async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  } else {
    return res.send("test");
  }
});

module.exports = router;
