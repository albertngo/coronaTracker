let express = require("express");
let router = express.Router();


router.get("/", (req,resp)=>{

    resp.render("home");

})


module.exports = router;