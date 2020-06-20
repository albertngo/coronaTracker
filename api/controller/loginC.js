let mongoose = require("mongoose");
let User = require("../models/users")
let bcrypt = require("bcrypt");

exports.login_put_controller = (req,resp)=>{
   
    
    User.findOne({email: req.body.email}).exec()
    .then(user=>{
        bcrypt.compare(req.body.password, user.password, function(err,result){
            
            if (result){
                    resp.status(200).json({
                    message: "Authentication Success!",
                   
                })
                console.log("Authentication Success!")
            }
            else {
                resp.status(500).json({
                    errorCode: 310,
                    message: "Error: Failed Authenticaiton"
                })            
                console.log("failed pw/email combo")}
        
        })
        })
    
}

exports.login_post_controller = (req,resp)=>{
    //interact with mongoDB
    console.log(req.body);
    bcrypt.hash(req.body.password,10,function(err,hash){
        if (err){
            return resp.status(500).json({
                error:err
            })
        } else {
            let user = new User({
                _id: mongoose.Types.ObjectId(),
                name: req.body.name,
                email: req.body.email,
                password: hash, 

            })
            user.save()
            .then(result=>{
                console.log(result);
                resp.status(200).json({
                    message: "User Created",
                    user: user
                })
            })
            .catch(error=>{
                console.log(error);
                if (error.code == 11000){
                    resp.status(500).json({
                        errorCode: error.code,
                        message: "Error: Email address already exists"
                    })
                } else{
                    resp.status(500).json({
                        errorCode: 1020,
                        message: "Error: Improper email address"
                    })
                }
        
        
            })
            
            
        
        }
    })
    
} 