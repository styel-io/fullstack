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
// @desc     Authenticate user & get token // 유저 인증 및 토큰 발행
// @access   Public
router.post(
  "/",
  [
    // username must be an email  // 유저네임이 이메일 형식인지 확인한다
    check("email", "Please include a valid email").isEmail(),
    // password must be at least 6 chars long  // 패스워드가 존재하는지 확인한다
    check("password", "Password is required").exists()
  ],
  async (req, res) => {
    // check에서 검증했을 때 에러가 발생하면 errors 변수에 담는다. 예를들어 이메일과 패스워드가 형식에 맞게 전달되면 에러는 발생하지 않고, 패스워드가 없이 전달되면 'Password is required'를 errors에 담는다.
    const errors = validationResult(req);
    // Finds the validation errors in this request and wraps them in an object with handy functions
    // 만약 errors변수가 비어있지 않다면, status 400 그리고 에러 메시지를 배열로 담아 클라이언트에게 전달한다
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
      // bcrypt의 .compare펑션을 이용하여 전달받은 패스워드와 데이터베이스에 저장된 유저의 패스워드가 일치 하는지 검증하여 isMatch 변수에 담는다.
      const isMatch = await bcrypt.compare(password, user.password);

      // 만약 일치하지 않는다면 status 400과 에러메시지를 클라이언트에게 전달한다. 백엔드에서 나타나는 에러메시지를 json형식의 객체로 전달하면서 키값을 msg로 설정하는 것은 클라이언트에서 받아들일 때 리액트에서 메시지를 처리하는 변수를 지정해 주는 것이다. msg는 리덕스 액션 payload 값에 담게 된다.
      if (!isMatch) {
        // res.status(400).json({ errors: [{ msg: "Invalid Credentials" }] });
        res.status(400).json({ errors: [{ msg: "Invalid Password" }] });
      }

      const payload = {
        user: {
          id: user.id
        }
      };

      // 유저 아이디값을 payload에 담고 jwt.sign함수를 활용하여 토큰을 생성하고 정상적으로 생성되면 json형식으로 클라이언트에 토큰을 전달한다.
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
