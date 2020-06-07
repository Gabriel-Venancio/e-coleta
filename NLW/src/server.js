const express = require("express")
const server = express()

const db = require("./database/db")

server.use(express.static("NLW/public"))

server.use(express.urlencoded({ extend: true }))


const nunjucks = require("nunjucks")
nunjucks.configure("NLW/src/views", {
    express: server,
    noCache: true
})


server.get("/", (req, res) =>{
    return res.render(__dirname + "/views/index.html")
})



server.get("/create-point", (req, res) =>{

    console.log(req.query)

    return res.render(__dirname + "/views/create-point.html")
})

server.post("/savepoint", (req, res) => {

    // console.log(req.body)


    
            const query = `
            INSERT INTO places (
                image,
                name,
                address,
                address2,
                state,
                city,
                items
            ) VALUES (
                ?,?,?,?,?,?,?
            );
        `
        const values = [
            req.body.image,
            req.body.name,
            req.body.address,
            req.body.address2,
            req.body.state,
            req.body.city,
            req.body.item
          ]

        function afterInsertData(err) {
            if(err) {
                console.log(err)
                return res.send("Erro no cadastro!")
            }

            console.log("Cadastrado com Sucesso")
            console.log(this)

            return res.render("/views/create-point.html", { saved: true })

        }

        db.run(query, values, afterInsertData)






    
})



server.get("/search", (req, res) =>{

    const search = req.query.search

    if(search == "") {

        return res.render(__dirname + "/views/search-results.html", { total: 0 })

    }

    db.all(`SELECT * FROM places WHERE city LIKE '%${search}%'`, function(err, rows){
                if(err) {
                    return console.log(err)
                } 

                const total = rows.length

                return res.render(__dirname + "/views/search-results.html", { places: rows, total: total })
            }) 
    
})

server.listen(3000)