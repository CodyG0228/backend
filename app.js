const express = require("express")
const app = express()

app.listen(3000,function(){
    console.log("Listening on port 3000")
})

//app.get("/hello", function(req,res){
    //res.send("<h1>Hello Express</h1>")
//})

//app.get("/goodbye", function(req, res){
    //res.send("<h1>Goodbye, Express</h1>")
//});