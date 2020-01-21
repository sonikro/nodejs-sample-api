var express = require('express');
var app = express();
var fs = require("fs");
 
app.use(function(req, res, next){
  var logData = {
    data: new Date().toISOString(),
    route: req.originalUrl
  }
  fs.appendFileSync("logs/request.txt", JSON.stringify(logData) + "\n")
   
  next()
})
 
app.get('/', function (req, res) {
  res.send('Hello World!');
});
app.get("/charizard", function (req, res){
  res.send("!!Bola de Fogo!!!")
});
app.get("/pikachu", function(req,res){
  res.send("!!Choque do trovão!!!!")
});
app.get("/status", function(req, res){
  res.send("Estou rodando em: "+process.env.ENVIRONMENT);
})
app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});