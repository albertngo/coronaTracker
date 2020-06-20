let mongoose = require("mongoose");


    var userSchema = mongoose.Schema({
        _id: mongoose.Schema.Types.ObjectId,
        name: String,
        email: {type:String, required:true,  unique:true, 
            match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/ },
        password: {type:String, required:true},
    })



module.exports = mongoose.model("Users", userSchema);