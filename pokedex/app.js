const mongoose = require('mongoose')
const express = require('express')
const nunjucks = require('nunjucks')



mongoose.connect('mongodb://localhost:27017/pokedex')

require('./models/Pokemon.js')
require('./models/Type.js')

const app = express()

app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css'))

app.use('/', require('./routes/pokemons'))
app.use('/types', require('./routes/types'))


nunjucks.configure('views', {
    autoescape: true,
    express: app
})


app.listen(3000);
console.log('Pokedex lancé sur le serveur 3000!')