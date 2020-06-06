const express = require("express")
const server = express()

server.use(express.static("NLW/public"))


const nunjucks = require("nunjucks")
nunjucks.configure("NLW/src/views", {
    express: server,
    noCache: true
})


server.get("/", (req, res) =>{
    return res.render(__dirname + "/views/index.html")
})

server.get("/create-point", (req, res) =>{
    return res.render(__dirname + "/views/create-point.html")
})

server.get("/search", (req, res) =>{
    return res.render(__dirname + "/views/search-results.html")
})

server.listen(3000)