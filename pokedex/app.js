const mongoose = require('mongoose')
const express = require('express')
const nunjucks = require('nunjucks')

const app = express()

mongoose.connect('mongodb://localhost/pokedex')

require('./models/pokemon.js')
require('./models/type.js')

app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css'))

app.use('/', require('./routes/pokemons'))
app.use('/types', require('./routes/types'))


nunjucks.configure('views', {
    autoescape: true,
    express: app
})


app.get('/', (req, res) => {
    res.send('Hello')
})

app.listen(3000);
console.log('Pokedex lancé sur le serveur 3000!')