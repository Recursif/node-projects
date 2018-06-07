
const mongoose = require('mongoose')

var pokemonSchema = new mongoose.Schema({
    name: String,
    number: Number,
    description: String,
    picture: String,
    types: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Type'
        }
    ]
})

var pokemon = mongoose.model('pokemon', pokemonSchema)

module.exports =  pokemon