const express = require("express")
const server = express()


server.get("/", (req, res) =>{
    res.send("Cheguei aqui")
})

server.listen(3000)