//LOGIN ROUTER
let express = require("express")
let router = express.Router();
let loginController = require("../controller/loginC")

router.put("/auth", loginController.login_put_controller)

router.get("/",(req,resp)=>{
    resp.render("login")
})

router.post("/newUser", loginController.login_post_controller)

module.exports = router;