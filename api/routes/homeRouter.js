let express = require("express");
let router = express.Router();
let fetch = require("node-fetch");

router.get("/", (req,resp)=>{

    fetch("https://api.covid19api.com/summary").then(resp=>{
        return resp.json();
    })

    .then(data=>{
        
        let TotalConfirmed = data.Global.TotalConfirmed.toLocaleString();
        let TotalDeaths = data.Global.TotalDeaths.toLocaleString();
        let TotalRecovered = data.Global.TotalRecovered.toLocaleString();
        
        resp.render("home", {allCountries:data.Countries, TotalConfirmed:TotalConfirmed,TotalDeaths:TotalDeaths,TotalRecovered:TotalRecovered});
    })


})


module.exports = router;