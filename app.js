let express = require("express");
let app = express();
let mongoose = require("mongoose");
let bodyParser = require("body-parser");
let homeRouter = require('./api/routes/homeRouter')
let loginRouter = require('./api/routes/loginRouter')
let graphRouter = require('./api/routes/graphRouter')

mongoose.connect("mongodb+srv://albertngo:thisisngo1995@cluster0-lefh1.mongodb.net/coronaLogin>?retryWrites=true&w=majority" , { useNewUrlParser: true , useUnifiedTopology: true, useCreateIndex: true})
app.set("view engine", "ejs");

//MIDDLEWARE
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(express.static("public"));

app.use("/home", homeRouter);
app.use("/login", loginRouter);
app.use("/graph", graphRouter);


module.exports = app;