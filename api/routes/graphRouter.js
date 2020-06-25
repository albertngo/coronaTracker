let express = require("express");
let router = express.Router();
let fetch = require("node-fetch")

router.get("/", (req,resp)=>{
    
    fetch("https://api.covid19api.com/countries").then(resp=>{
        return resp.json();
    })
    
    .then(data=>{
        let countryList = [];

        function capitalizeFLetter(string) { 
            return string[0].toUpperCase() +  
              string.slice(1); 
          } 

        //get the slug of each country
        //sort into an array
        for (let country of data){
            
            countryList.push(capitalizeFLetter(country.Slug))
        }
        countryList.sort();


        resp.render("graph", {countryList:countryList});
    })


})
    


module.exports = router;