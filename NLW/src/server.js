const express = require("express")
const server = express()

const db = require("./database/db")

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

    db.all(`SELECT * FROM places`, function(err, rows){
                if(err) {
                    return console.log(err)
                } 

                const total = rows.length

                return res.render(__dirname + "/views/search-results.html", { places: rows, total: total })
            }) 
    
})

server.listen(3000)