const mongoose = require('mongoose')
const express = require('express')
const nunjucks = require('nunjucks')
const bodyParser = require('body-parser')
const multer = require('multer')

const upload = multer({
    dest: __dirname + '/uploads'
})



mongoose.connect('mongodb://localhost:27017/pokedex')

require('./models/Pokemon.js')
require('./models/Type.js')

const app = express()

app.use(bodyParser.urlencoded({ extended: true }))
app.use(upload.single('file'))


app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css'))

app.use('/', require('./routes/pokemons'))
app.use('/types', require('./routes/types'))

// server image uploaded
app.use('/uploads', express.static(__dirname + '/uploads'))


nunjucks.configure('views', {
    autoescape: true,
    express: app
})


app.listen(3000);
console.log('Pokedex lancé sur le serveur 3000!')