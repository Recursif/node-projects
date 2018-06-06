const mongoose = require('mongoose')
const express = require('express')
const nunjucks = require('nunjucks')

const app = express()

mongoose.connect('mongodb://localhost/pokedex')

app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css'))


nunjucks.configure('views', {
    autoescape: true,
    express: app
})




app.get('/', (res, req) => {
    res.setEncoding('Hello')
})

app.listen(3000);
console.log('Pokedex lancé sur le serveur 3000!')