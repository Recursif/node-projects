
const mongoose = require('mongoose')

var typeSchema = new mongoose.Schema({
    name: String,
    color: {
        type: String,
        default: 'red'
    }
})


typeSchema.virtual('pokemons', {
    ref: 'pokemon',
    localField: '_id',
    foreignField: 'types'
})

/*
Defini un virtual pokemon qui est une ref
création d'une relation many to many entre
les pokemons et les types 
un type peut avoir plusieurs pokemon et vice versa
 */
module.exports = type