let express = require("express");
let app = express();
let homeRouter = require('./api/routes/homeRouter')

app.set("views engine", "ejs");
app.use(express.static("public"));

app.use("/home", homeRouter)









module.exports = app;