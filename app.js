let express = require("express");
let app = express();
let homeRouter = require('./api/routes/homeRouter')
let loginRouter = require('./api/routes/loginRouter')

app.set("view engine", "ejs");
app.use(express.static("public"));

app.use("/home", homeRouter);
app.use("/login", loginRouter);








module.exports = app;