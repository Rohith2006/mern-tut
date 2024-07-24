const express = require('express')
const app = express()

app.get("/hello" , (req,res) => {
    res.send("hello page") 
})

app.listen(1337,  () => {
    console.log("server started")
})