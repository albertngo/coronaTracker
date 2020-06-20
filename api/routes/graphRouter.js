let express = require("express");
let router = express.Router();


router.get("/", (req,resp)=>{

    resp.render("graph");

})


module.exports = router;