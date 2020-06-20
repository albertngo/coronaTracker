let http = require("http");
let app = require("./app");

let server = http.createServer(app);


server.listen(5500);
console.log("Listening on 5500.....");
