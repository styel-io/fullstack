const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const User = require("../../models/User");


router.get('/', (req, res, next) => {
    console.log("login page test");
    res.render("login.html");
})

router.post('/login', async(req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    console.log("-----------------------");
    console.log(email);
    console.log("-----------------------");
    console.log(password);

    try{
        let user = await User.findOne({ email });

        console.log('로그인 test');
        console.log(user);
    
        if(req.session.user){
            // 이미 로그인이 되어 있는 상태
            console.log("이미 로그인이 되어 있습니다.");
            
            res.render("fail.html");
        }else{
            if(!user){
                console.log('ID 없다고? -------------------------');
                res.render("fail.html");
            }
            console.log(password);
            console.log(user.password);
            const isMatch = await bcrypt.compare(password, user.password);
            
            console.log("-------------------------");
            console.log(isMatch);
            if(!isMatch){
                console.log("password 없다고? ----------------");
                res.render("fail.html");
            }
            req.session.user = email;
        
            res.render("dashboard.ejs");
        }
    }catch(err){
        console.log("왜 ㅠㅠ");
    }

    

})


router.get("/logout", (req, res)=>{
    req.session.destroy();
})

module.exports = router;
