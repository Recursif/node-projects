
const express = require('express')
const cookieParser = require('cookie-parser')
 
const app = express()

app.use(cookieParser())
 
app.get("/", (req, res) => {
    console.log("Cookies: ", req.cookies)
    res.send({ "cookies": req.cookies })
})
 
app.listen(3001, () => {
    console.log("serveur lancé sur le port 3001")
})
